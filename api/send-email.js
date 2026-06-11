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
    movilizacion: 'Movilizacion',
    desmovilizacion: 'Desmovilizacion',
    cambio: 'Cambio de equipo',
    accesorio: 'Solo accesorio'
  };
  const tipoLabel = tipos[data.tipo] || data.tipo;

  const origenTexto = data.origen === 'galera'
    ? 'SMM — Galera La Manianitas'
    : `${data.retiro_cliente} / ${data.retiro_proyecto}`;

  const origenUbicacion = data.origen === 'galera'
    ? 'La Manianitas, Panama'
    : (data.retiro_ubicacion || '');

  const condiciones = [
    data.operador ? 'Operador incluido' : 'Sin operador',
    data.diesel   ? 'Diesel incluido'   : 'Sin diesel',
    `Propiedad: ${data.propiedad === 'smm' ? 'SMM' : 'Arrendada'}`
  ];

  const notasHtml = data.notas ? `
    <div style="background:#fffbf0;border:1px solid #f0e0a0;border-radius:8px;padding:14px 16px;margin-top:24px">
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#c8a030;margin-bottom:6px">Notas / Instrucciones especiales</div>
      <div style="font-size:13px;color:#6b4c00;line-height:1.6">${data.notas}</div>
    </div>` : '';

  const fechaMovil = data.fecha_movilizacion ? data.fecha_movilizacion.split('-').reverse().join('/') : '—';
  const fechaAlq   = data.fecha_inicio_alquiler ? data.fecha_inicio_alquiler.split('-').reverse().join('/') : '—';

  const excavadoraSVG = `<svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="15" width="20" height="10" rx="1" fill="#FFD700"/>
    <rect x="20" y="10" width="9" height="9" rx="1" fill="#FFD700"/>
    <rect x="22" y="11.5" width="6" height="5" rx="0.5" fill="#1a1a1a" opacity="0.5"/>
    <rect x="4" y="8" width="18" height="3.5" rx="1" fill="#FFD700" transform="rotate(-18 4 8)"/>
    <rect x="2" y="13" width="11" height="3" rx="1" fill="#FFD700" transform="rotate(14 2 13)"/>
    <path d="M1 20 L7 16 L9 22 L1 22 Z" fill="#FFD700"/>
    <rect x="8" y="24" width="23" height="4.5" rx="2" fill="#1a1a1a" opacity="0.85"/>
    <circle cx="11" cy="26" r="2.2" fill="#FFD700"/>
    <circle cx="18" cy="26" r="1.6" fill="#FFD700" opacity="0.8"/>
    <circle cx="27" cy="26" r="2.2" fill="#FFD700"/>
    <rect x="25" y="14" width="4" height="5" rx="0.5" fill="#FFD700" opacity="0.7"/>
  </svg>`;

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#e8e8e8;font-family:'Segoe UI',system-ui,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:20px 0">

  <!-- HEADER -->
  <div style="background:#fff;padding:20px 32px;border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #C0392B">
    <img src="data:image/png;base64,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" style="height:38px;width:auto" alt="SMM">
    <div style="font-size:11px;color:#999;text-align:right;line-height:1.6">Nueva solicitud<br>${new Date().toLocaleDateString('es-PA',{day:'numeric',month:'short',year:'numeric'})}</div>
  </div>

  <!-- BARRA ROJA -->
  <div style="background:#1a1a1a;padding:14px 24px;display:flex;align-items:center;gap:14px">
    ${excavadoraSVG}
    <span style="font-size:13px;font-weight:600;color:#fff;flex:1">Nueva solicitud de ${tipoLabel} — ${data.equipo_codigo || '—'} | ${data.entrega_cliente}</span>
    <span style="font-size:10px;color:#555;font-family:monospace;white-space:nowrap">${data.referencia}</span>
  </div>

  <!-- BODY -->
  <div style="background:#fff;padding:28px 32px">

    <!-- Bloque equipo/cliente -->
    <div style="border-left:4px solid #C0392B;padding:14px 18px;background:#fafafa;margin-bottom:24px;border-radius:0 8px 8px 0">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#C0392B;margin-bottom:5px">${tipoLabel}</div>
      <div style="font-size:22px;font-weight:700;color:#1a1a1a;margin-bottom:3px">${data.equipo_codigo || '—'}</div>
      <div style="font-size:14px;color:#555">Cliente: ${data.entrega_cliente} &nbsp;/&nbsp; ${data.entrega_proyecto}</div>
    </div>

    <!-- Ruta -->
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#aaa;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #f0f0f0">Ruta del movimiento</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td width="46%" style="background:#f5f5f5;border:1px solid #e8e8e8;border-radius:8px;padding:14px 16px;vertical-align:top">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#aaa;margin-bottom:5px">Origen — Retiro</div>
          <div style="font-size:14px;font-weight:700;color:#1a1a1a;margin-bottom:4px">${origenTexto}</div>
          <div style="font-size:12px;color:#777;line-height:1.5">${origenUbicacion}</div>
          ${data.retiro_contacto ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #e0e0e0;font-size:11px;color:#999"><b style="color:#666">Contacto:</b> ${data.retiro_contacto}</div>` : ''}
        </td>
        <td width="8%" style="text-align:center;vertical-align:middle;padding:0 6px">
          <svg width="100%" viewBox="0 0 32 20" fill="none" style="display:block">
            <line x1="0" y1="10" x2="26" y2="10" stroke="#C0392B" stroke-width="2.5"/>
            <polygon points="20,4 32,10 20,16" fill="#C0392B"/>
          </svg>
        </td>
        <td width="46%" style="background:#1a1a1a;border:1px solid #1a1a1a;border-radius:8px;padding:14px 16px;vertical-align:top">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#666;margin-bottom:5px">Destino — Entrega</div>
          <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px">${data.entrega_cliente}</div>
          <div style="font-size:12px;color:#888;line-height:1.5">Proyecto: ${data.entrega_proyecto}<br>${data.entrega_ubicacion || ''}</div>
          ${data.entrega_contacto ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #2a2a2a;font-size:11px;color:#666"><b style="color:#aaa">Contacto:</b> ${data.entrega_contacto}</div>` : ''}
        </td>
      </tr>
    </table>

    <!-- Detalles -->
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#aaa;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #f0f0f0">Detalles</div>
    <table width="100%" cellpadding="0" cellspacing="1" style="background:#eee;border:1px solid #eee;border-radius:8px;overflow:hidden;margin-bottom:24px">
      <tr>
        <td style="background:#fff;padding:12px 14px;width:33%">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#bbb;margin-bottom:4px">Fecha movilizacion</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${fechaMovil}</div>
        </td>
        <td style="background:#fff;padding:12px 14px;width:33%">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#bbb;margin-bottom:4px">Inicio alquiler</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${fechaAlq}</div>
        </td>
        <td style="background:#fff;padding:12px 14px;width:33%">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#bbb;margin-bottom:4px">Solicitado por</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${data.vendedor}</div>
        </td>
      </tr>
      <tr>
        <td style="background:#fff;padding:12px 14px">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#bbb;margin-bottom:4px">Accesorio</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${data.accesorio_actual || '—'}</div>
        </td>
        <td style="background:#fff;padding:12px 14px">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#bbb;margin-bottom:4px">Referencia</div>
          <div style="font-size:11px;font-weight:600;color:#1a1a1a;font-family:monospace">${data.referencia}</div>
        </td>
        <td style="background:#fff;padding:12px 14px">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#bbb;margin-bottom:4px">Propiedad</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${data.propiedad === 'smm' ? 'SMM' : 'Arrendada'}</div>
        </td>
      </tr>
    </table>

    <!-- Condiciones -->
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#aaa;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #f0f0f0">Condiciones</div>
    <div style="background:#1a1a1a;border-radius:8px;padding:12px 16px;display:flex;gap:8px;flex-wrap:wrap;margin-bottom:${data.notas ? '0' : '0'}">
      <span style="font-size:11px;padding:4px 12px;border-radius:4px;font-weight:600;background:${data.operador ? '#1a7a4a' : '#2a2a2a'};color:${data.operador ? '#fff' : '#666'}">${data.operador ? '✓ Operador incluido' : '✗ Sin operador'}</span>
      <span style="font-size:11px;padding:4px 12px;border-radius:4px;font-weight:600;background:${data.diesel ? '#1a7a4a' : '#2a2a2a'};color:${data.diesel ? '#fff' : '#666'}">${data.diesel ? '✓ Diesel incluido' : '✗ Sin diesel'}</span>
      <span style="font-size:11px;padding:4px 12px;border-radius:4px;font-weight:600;background:#C0392B;color:#fff">Propiedad ${data.propiedad === 'smm' ? 'SMM' : 'Arrendada'}</span>
    </div>

    ${notasHtml}
  </div>

  <!-- FOOTER -->
  <div style="background:#f5f5f5;border-radius:0 0 12px 12px;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #e8e8e8">
    <div style="font-size:11px;color:#aaa">Super Mega Maquinas &middot; Heavy Equipment Rental</div>
    <div style="font-size:10px;color:#ccc;text-align:right">Generado automaticamente<br>No responder directamente</div>
  </div>

</div>
</body></html>`;

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
      subject: `Nueva solicitud de ${tipoLabel} — ${data.equipo_codigo || ''} | ${data.entrega_cliente}`,
      html: htmlContent
    })
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    return res.status(500).json({ error: err });
  }

  return res.status(200).json({ ok: true });
}
