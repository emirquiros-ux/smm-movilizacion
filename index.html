export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  const data = req.body;

  const tipos = {
    movilizacion: 'Movilización',
    desmovilizacion: 'Desmovilización',
    cambio: 'Cambio de equipo',
    accesorio: 'Solo accesorio'
  };
  const tipoLabel = tipos[data.tipo] || data.tipo;

  const origenTexto = data.origen === 'galera'
    ? 'SMM — Galera La Mañanitas'
    : `${data.retiro_cliente} / ${data.retiro_proyecto}`;

  const condiciones = [
    data.operador ? '✓ Operador incluido' : '✗ Sin operador',
    data.diesel   ? '✓ Diesel incluido'   : '✗ Sin diesel',
    `Propiedad: ${data.propiedad === 'smm' ? 'SMM' : 'Arrendada'}`
  ].join(' &nbsp;|&nbsp; ');

  const notasHtml = data.notas
    ? `<tr><td colspan="2" style="padding:12px 16px;background:#fffbf0;border-top:0.5px solid #f0e0a0">
        <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#c8a030;margin-bottom:4px">📝 Notas</div>
        <div style="font-size:13px;color:#6b4c00">${data.notas}</div>
      </td></tr>`
    : '';

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Segoe UI',system-ui,sans-serif">
<div style="max-width:580px;margin:0 auto;padding:20px 0">

  <div style="background:#fff;border-top:4px solid #C0392B;border-radius:12px 12px 0 0;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;border-bottom:0.5px solid #e0e0e0">
    <div style="font-size:16px;font-weight:700;color:#1a1a1a;letter-spacing:.04em">SMM <span style="font-weight:400;color:#888;font-size:12px">SUPER MEGA MÁQUINAS</span></div>
    <div style="font-size:11px;color:#aaa;text-align:right">Nueva solicitud<br>${new Date().toLocaleDateString('es-PA', {day:'numeric',month:'short',year:'numeric'})}</div>
  </div>

  <div style="background:#fff;padding:24px 28px">
    <div style="background:#fdf2f1;border:0.5px solid #e8c5c2;border-radius:8px;padding:12px 16px;margin-bottom:20px;display:flex;align-items:center;gap:10px">
      <div style="width:8px;height:8px;background:#C0392B;border-radius:50%;flex-shrink:0"></div>
      <span style="font-size:13px;color:#C0392B;font-weight:500">Nueva solicitud de movilización registrada</span>
    </div>

    <div style="background:#f5f5f5;border-radius:8px;padding:10px 16px;display:inline-block;font-size:13px;font-weight:600;color:#1a1a1a;letter-spacing:.04em;margin-bottom:20px">📋 ${data.referencia}</div>

    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#aaa;margin-bottom:10px">Detalles del movimiento</div>
    <table style="width:100%;border:0.5px solid #e0e0e0;border-radius:8px;border-collapse:collapse;overflow:hidden;margin-bottom:20px">
      <tr>
        <td style="padding:10px 14px;border-right:0.5px solid #e0e0e0;border-bottom:0.5px solid #e0e0e0;width:50%">
          <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Tipo</div>
          <div style="font-size:13px;font-weight:500;color:#1a1a1a">${tipoLabel}</div>
        </td>
        <td style="padding:10px 14px;border-bottom:0.5px solid #e0e0e0">
          <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Equipo</div>
          <div style="font-size:13px;font-weight:500;color:#1a1a1a">${data.equipo_codigo || '—'}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 14px;border-right:0.5px solid #e0e0e0;border-bottom:0.5px solid #e0e0e0">
          <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Fecha movilización</div>
          <div style="font-size:13px;font-weight:500;color:#1a1a1a">${data.fecha_movilizacion}</div>
        </td>
        <td style="padding:10px 14px;border-bottom:0.5px solid #e0e0e0">
          <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Inicio alquiler</div>
          <div style="font-size:13px;font-weight:500;color:#1a1a1a">${data.fecha_inicio_alquiler}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 14px;border-right:0.5px solid #e0e0e0">
          <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Solicitado por</div>
          <div style="font-size:13px;font-weight:500;color:#1a1a1a">${data.vendedor}</div>
        </td>
        <td style="padding:10px 14px">
          <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Accesorio</div>
          <div style="font-size:13px;font-weight:500;color:#1a1a1a">${data.accesorio_actual || '—'}</div>
        </td>
      </tr>
      ${notasHtml}
    </table>

    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#aaa;margin-bottom:10px">Ruta</div>
    <div style="background:#f5f5f5;border-radius:8px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <div style="flex:1">
        <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em">Origen</div>
        <div style="font-size:13px;font-weight:600;color:#1a1a1a">${origenTexto}</div>
      </div>
      <div style="font-size:20px;color:#C0392B">→</div>
      <div style="flex:1;text-align:right">
        <div style="font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.06em">Destino</div>
        <div style="font-size:13px;font-weight:600;color:#1a1a1a">${data.entrega_cliente}</div>
        <div style="font-size:11px;color:#6b6b6b">${data.entrega_proyecto}</div>
      </div>
    </div>

    <div style="font-size:12px;color:#6b6b6b;text-align:center;padding:8px 0">${condiciones}</div>
  </div>

  <div style="background:#f5f5f5;border-radius:0 0 12px 12px;padding:14px 28px;text-align:center;font-size:11px;color:#aaa;line-height:1.6;border-top:0.5px solid #e0e0e0">
    Super Mega Máquinas · Heavy Equipment Rental<br>
    Este correo fue generado automáticamente — no responder directamente.
  </div>
</div>
</body></html>`;

  // Send to all recipients from config
  const destinatarios = ['emir.quiros@infratec.com.pa'];

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_KEY}`
    },
    body: JSON.stringify({
      from: 'SMM Movilizaciones <onboarding@resend.dev>',
      to: destinatarios,
      subject: `[${data.referencia}] Nueva solicitud — ${tipoLabel} ${data.equipo_codigo || ''}`,
      html: htmlContent
    })
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    return res.status(500).json({ error: err });
  }

  return res.status(200).json({ ok: true });
}
