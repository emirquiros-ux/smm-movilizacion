import nodemailer from 'nodemailer';
import { construirEmail } from './_email-template.js';
import { EMAILS_GERENTES, EMAILS_ALERTA } from './_emails.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_PASS;
  if (!GMAIL_USER || !GMAIL_PASS) {
    return res.status(500).json({ error: 'Faltan las variables GMAIL_USER / GMAIL_PASS en Vercel' });
  }

  const d = req.body;

  // ─── Config aprobación (4.3) ───────────────────────────────
  const SUPABASE_URL = "https://ujoxrtwyfsqabhrjtjlr.supabase.co";
  const SUPABASE_KEY = "sb_publishable_skDHEZ0PRVa3z-3fAaw4lw_v3LD0TSA";
  const BASE_URL = `https://${req.headers.host}`;

  // Construir el correo completo (mismo diseño de siempre)
  const { subjectDirecto, subjectAprob, htmlContent, requiereAprobacion } = construirEmail(d);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_PASS }
  });

  // Bloque de botones Aprobar / Rechazar (solo correo a gerentes)
  function botonesHtml(token){
    const urlAprobar  = `${BASE_URL}/api/aprobar?token=${token}`;
    const urlRechazar = `${BASE_URL}/api/rechazar?token=${token}`;
    return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;padding:8px 32px 28px">
    <tr><td style="padding-bottom:14px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999">Acción requerida — solo gerencia</div>
    </td></tr>
    <tr><td>
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:12px">
          <a href="${urlAprobar}" style="display:inline-block;background:#1a7a4a;color:#fff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:8px">✅ Aprobar</a>
        </td>
        <td>
          <a href="${urlRechazar}" style="display:inline-block;background:#C0392B;color:#fff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:8px">❌ Rechazar</a>
        </td>
      </tr></table>
    </td></tr>
  </table>`;
  }

  try {
    if (requiereAprobacion) {
      // 1) Generar token único y guardarlo en Supabase
      const token = `${d.referencia || 'ref'}-${Date.now()}-${Math.random().toString(16).slice(2,10)}`;
      const patch = {
        requiere_aprobacion: true,
        estado_aprobacion: 'pendiente',
        token_aprobacion: token
      };
      const upd = await fetch(`${SUPABASE_URL}/rest/v1/solicitudes?referencia=eq.${encodeURIComponent(d.referencia)}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(patch)
      });
      if (!upd.ok) {
        const e = await upd.text();
        return res.status(500).json({ error: 'No se pudo guardar el token de aprobación: ' + e });
      }

      // 2) Insertar los botones justo antes del footer del HTML
      const htmlGerentes = htmlContent.replace(
        '  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-top:1.5px solid #eee;border-radius:0 0 10px 10px">',
        botonesHtml(token) +
        '\n  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-top:1.5px solid #eee;border-radius:0 0 10px 10px">'
      );

      // 3) Enviar SOLO a gerentes
      await transporter.sendMail({
        from: `"Movilizaciones SMM" <${GMAIL_USER}>`,
        to: EMAILS_GERENTES,
        subject: subjectAprob,
        html: htmlGerentes
      });
    } else {
      // Flujo directo (desmovilización / accesorio-desmovilización): a todos, sin botones
      await transporter.sendMail({
        from: `"Movilizaciones SMM" <${GMAIL_USER}>`,
        to: EMAILS_ALERTA,
        subject: subjectDirecto,
        html: htmlContent
      });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
