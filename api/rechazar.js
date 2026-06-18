import nodemailer from 'nodemailer';
import { EMAILS_GERENTES, VENDEDOR_EMAIL, DEFAULT_EMAIL } from './_emails.js';

const SUPABASE_URL = "https://ujoxrtwyfsqabhrjtjlr.supabase.co";
const SUPABASE_KEY = "sb_publishable_skDHEZ0PRVa3z-3fAaw4lw_v3LD0TSA";

const fmt = f => f ? String(f).split('-').reverse().join('/') : '—';
const tipoLabelOf = (d) => {
  const tipos = { movilizacion:'Movilización', desmovilizacion:'Desmovilización', cambio:'Cambio de Equipos', accesorio:'Accesorio' };
  if (d.tipo === 'accesorio') {
    const s = { movilizacion:'Movilización', desmovilizacion:'Desmovilización', cambio:'Cambio' }[d.subtipo] || '';
    return s + ' de accesorio';
  }
  return tipos[d.tipo] || d.tipo;
};
const equipoOf = (d) => d.tipo === 'cambio'
  ? `${d.equipo_sale || '—'} ⇄ ${d.equipo_entra || '—'}`
  : (d.equipo_codigo || '—');

function pagina(titulo, cuerpo, color = '#C0392B') {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${titulo} — SMM</title>
<style>
  body{margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#e8e8e8;color:#1a1a1a;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
  .card{background:#fff;max-width:520px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.12)}
  .top{background:#fff;border-bottom:4px solid ${color};padding:22px 28px}
  .brand{font-size:26px;font-weight:900;letter-spacing:.04em}
  .brand-sub{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#999;margin-top:2px}
  .body{padding:26px 28px}
  h1{font-size:20px;margin:0 0 6px}
  .muted{color:#6b6b6b;font-size:14px;line-height:1.5}
  .box{background:#fafafa;border:1px solid #e0e0e0;border-radius:8px;padding:14px;margin:18px 0;font-size:14px;line-height:1.6}
  label{display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b6b6b;margin:14px 0 6px}
  textarea{width:100%;box-sizing:border-box;border:1px solid #e0e0e0;border-radius:8px;padding:11px;font-size:14px;font-family:inherit;min-height:80px;resize:vertical}
  button{width:100%;border:none;border-radius:8px;padding:14px;font-size:15px;font-weight:700;color:#fff;background:${color};cursor:pointer;margin-top:18px;font-family:inherit}
  .ref{font-family:monospace;color:#999;font-size:12px;margin-top:14px}
</style></head><body>
<div class="card">
  <div class="top"><div class="brand">SMM</div><div class="brand-sub">Heavy Equipment Rental</div></div>
  <div class="body">${cuerpo}</div>
</div></body></html>`;
}

async function getSolicitud(token) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/solicitudes?token_aprobacion=eq.${encodeURIComponent(token)}&select=*`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  if (!r.ok) return null;
  const rows = await r.json();
  return rows[0] || null;
}

async function leerBody(req) {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) return req.body;
  const raw = await new Promise((resolve) => {
    let data = ''; req.on('data', c => data += c); req.on('end', () => resolve(data)); req.on('error', () => resolve(''));
  });
  const out = {};
  if (typeof req.body === 'string') {
    new URLSearchParams(req.body).forEach((v,k) => out[k]=v);
  } else if (raw) {
    new URLSearchParams(raw).forEach((v,k) => out[k]=v);
  }
  return out;
}

export default async function handler(req, res) {
  const token = req.query.token || (req.body && req.body.token);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!token) {
    return res.status(400).send(pagina('Error', '<h1>Enlace inválido</h1><p class="muted">No se encontró el código.</p>'));
  }

  const d = await getSolicitud(token);

  if (!d) {
    return res.status(200).send(pagina('No disponible',
      '<h1>Esta solicitud ya fue gestionada</h1><p class="muted">Otro gerente ya aprobó o rechazó esta solicitud, o el enlace ya no es válido.</p>', '#9a6a00'));
  }
  if (d.estado_aprobacion && d.estado_aprobacion !== 'pendiente') {
    const txt = d.estado_aprobacion === 'aprobada' ? 'aprobada' : 'rechazada';
    return res.status(200).send(pagina('Ya gestionada',
      `<h1>Solicitud ya ${txt}</h1><p class="muted">Esta solicitud ya fue ${txt} anteriormente.</p><div class="ref">${d.referencia || ''}</div>`, '#9a6a00'));
  }

  // ─── GET: mostrar página con motivo opcional ───
  if (req.method === 'GET') {
    const cuerpo = `
      <h1>Confirmar rechazo</h1>
      <p class="muted">Estás por rechazar esta solicitud. Pasará a estado <b>Cancelada</b> y se avisará a quien la solicitó.</p>
      <div class="box">
        <b>${tipoLabelOf(d)}</b> — ${equipoOf(d)}<br>
        Cliente: <b>${d.cliente_principal || d.entrega_cliente || '—'}</b><br>
        Fecha: ${fmt(d.fecha_movilizacion)}<br>
        Solicitado por: ${d.vendedor || '—'}
      </div>
      <form method="POST" action="/api/rechazar?token=${encodeURIComponent(token)}">
        <label for="motivo">Motivo del rechazo (opcional)</label>
        <textarea id="motivo" name="motivo" placeholder="Puedes dejarlo en blanco"></textarea>
        <button type="submit">❌ Confirmar rechazo</button>
      </form>
      <div class="ref">${d.referencia || ''}</div>`;
    return res.status(200).send(pagina('Confirmar rechazo', cuerpo));
  }

  // ─── POST: ejecutar el rechazo ───
  if (req.method === 'POST') {
    const body = await leerBody(req);
    const motivo = (body.motivo || '').trim();

    const patch = {
      estado_aprobacion: 'rechazada',
      estado_ejecucion: 'cancelada',
      token_aprobacion: null,
      motivo_rechazo: motivo || null,
      decidido_en: new Date().toISOString()
    };

    const upd = await fetch(`${SUPABASE_URL}/rest/v1/solicitudes?token_aprobacion=eq.${encodeURIComponent(token)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json', 'Prefer': 'return=representation'
      },
      body: JSON.stringify(patch)
    });
    const updated = upd.ok ? await upd.json() : [];
    if (!updated.length) {
      return res.status(200).send(pagina('No disponible',
        '<h1>Esta solicitud ya fue gestionada</h1><p class="muted">Otro gerente actuó primero.</p>', '#9a6a00'));
    }

    // Notificar a gerentes + solicitante
    try {
      const GMAIL_USER = process.env.GMAIL_USER, GMAIL_PASS = process.env.GMAIL_PASS;
      if (GMAIL_USER && GMAIL_PASS) {
        const transporter = nodemailer.createTransport({ host:'smtp.gmail.com', port:465, secure:true, auth:{ user:GMAIL_USER, pass:GMAIL_PASS } });
        const cliente = d.cliente_principal || d.entrega_cliente || '';
        const det = d.tipo === 'cambio' ? equipoOf(d) : (d.equipo_tipo_singular ? d.equipo_tipo_singular + ' ' : '') + (d.equipo_codigo || '');
        const emailSolicitante = VENDEDOR_EMAIL[d.vendedor] || DEFAULT_EMAIL;
        const destinatarios = [...new Set([...EMAILS_GERENTES, emailSolicitante])];
        const motivoTxt = motivo ? `<p style="margin:6px 0"><b>Motivo:</b> ${motivo}</p>` : `<p style="margin:6px 0;color:#888">Sin motivo especificado.</p>`;
        const html = `<div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden">
          <div style="background:#C0392B;color:#fff;padding:18px 24px;font-size:17px;font-weight:700">❌ ${tipoLabelOf(d)} RECHAZADA</div>
          <div style="padding:22px 24px">
            <p style="margin:0 0 10px;font-size:16px"><b>${det}</b> — Cliente: <b>${cliente}</b></p>
            <p style="margin:6px 0;color:#444">Fecha solicitada: ${fmt(d.fecha_movilizacion)}</p>
            <p style="margin:6px 0;color:#444">Solicitado por: ${d.vendedor || '—'}</p>
            ${motivoTxt}
            <p style="margin:14px 0 0;font-family:monospace;color:#bbb;font-size:12px">${d.referencia || ''}</p>
          </div></div>`;
        await transporter.sendMail({
          from: `"Movilizaciones SMM" <${GMAIL_USER}>`,
          to: destinatarios,
          subject: `❌ ${tipoLabelOf(d)} RECHAZADA — ${equipoOf(d)} | ${cliente}`,
          html
        });
      }
    } catch(e) { /* el rechazo ya quedó guardado */ }

    return res.status(200).send(pagina('Rechazada',
      `<h1>Solicitud rechazada</h1><p class="muted">La solicitud pasó a estado <b>Cancelada</b> y se avisó a quien la solicitó.</p><div class="ref">${d.referencia || ''}</div>`));
  }

  return res.status(405).send('Método no permitido');
}
