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

  const origenNombre = data.origen === 'galera' ? 'SMM — Galera' : (data.retiro_cliente || '');
  const origenDetalle = data.origen === 'galera' ? 'La Manianitas, Panama' : (data.retiro_ubicacion || '');

  const fechaMovil = data.fecha_movilizacion ? data.fecha_movilizacion.split('-').reverse().join('/') : '—';
  const fechaAlq   = data.fecha_inicio_alquiler ? data.fecha_inicio_alquiler.split('-').reverse().join('/') : '—';

  const propiedadLabel = data.propiedad === 'smm' ? 'Equipo SMM' : 'Equipo Subarrendado';
  const operadorLabel  = data.operador ? 'Operador incluido' : 'Sin operador';
  const dieselLabel    = data.diesel   ? 'Diesel incluido'   : 'Sin diesel';
  const operadorColor  = data.operador ? '#e8f5ee;color:#1a7a4a;border:1.5px solid #b8e0cc' : '#f8f8f8;color:#666;border:1.5px solid #e0e0e0';
  const dieselColor    = data.diesel   ? '#e8f5ee;color:#1a7a4a;border:1.5px solid #b8e0cc' : '#f8f8f8;color:#666;border:1.5px solid #e0e0e0';

  const contactoDestino = data.entrega_contacto
    ? `<div style="font-size:12px;color:#555;margin-top:8px;padding-top:8px;border-top:1px solid #eee"><b style="color:#1a1a1a">Contacto:</b> ${data.entrega_contacto}</div>`
    : '';

  const contactoOrigen = data.origen === 'proyecto' && data.retiro_contacto
    ? `<div style="font-size:12px;color:#555;margin-top:8px;padding-top:8px;border-top:1px solid #eee"><b style="color:#1a1a1a">Contacto:</b> ${data.retiro_contacto}</div>`
    : '';

  const notasHtml = data.notas ? `
  <div style="background:#fffbf0;border:1.5px solid #f0e0a0;border-radius:8px;padding:16px;margin-bottom:28px">
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#c8a030;margin-bottom:6px">Notas / Instrucciones</div>
    <div style="font-size:14px;color:#6b4c00;line-height:1.6">${data.notas}</div>
  </div>` : '';

  const excavadoraSVG = `<svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11" y="16" width="22" height="11" rx="1.5" fill="#FFD700"/>
    <rect x="22" y="10" width="10" height="10" rx="1" fill="#FFD700"/>
    <rect x="24" y="12" width="7" height="5.5" rx="0.5" fill="#C0392B" opacity="0.4"/>
    <rect x="3" y="8" width="20" height="3.5" rx="1" fill="#FFD700" transform="rotate(-18 3 8)"/>
    <rect x="1" y="14" width="13" height="3" rx="1" fill="#FFD700" transform="rotate(14 1 14)"/>
    <path d="M0 21 L8 17 L10 24 L0 24 Z" fill="#FFD700"/>
    <rect x="9" y="26" width="26" height="5" rx="2.5" fill="#333"/>
    <circle cx="13" cy="28.5" r="2.3" fill="#FFD700"/>
    <circle cx="20" cy="28.5" r="1.6" fill="#FFD700" opacity="0.7"/>
    <circle cx="30" cy="28.5" r="2.3" fill="#FFD700"/>
    <rect x="28" y="15" width="4" height="5" rx="0.5" fill="#FFD700" opacity="0.7"/>
  </svg>`;

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#e8e8e8;font-family:'Segoe UI',system-ui,sans-serif">
<div style="max-width:580px;margin:0 auto;padding:20px 0">

  <!-- HEADER -->
  <div style="background:#fff;padding:22px 32px;border-bottom:4px solid #C0392B;display:flex;align-items:center;justify-content:space-between;border-radius:10px 10px 0 0">
    <div>
      <div style="font-size:28px;font-weight:900;letter-spacing:.04em;color:#1a1a1a;line-height:1">SMM</div>
      <div style="font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#999;margin-top:3px">Heavy Equipment Rental</div>
    </div>
    <div style="font-size:12px;color:#999;text-align:right;line-height:1.7">${new Date().toLocaleDateString('es-PA',{day:'numeric',month:'short',year:'numeric'})}<br>${new Date().toLocaleTimeString('es-PA',{hour:'2-digit',minute:'2-digit'})}</div>
  </div>

  <!-- BANNER -->
  <div style="background:#C0392B;padding:18px 32px;display:flex;align-items:center;gap:14px">
    ${excavadoraSVG}
    <div style="font-size:15px;font-weight:700;color:#fff;flex:1;line-height:1.4">Nueva solicitud de ${tipoLabel}<br>${data.equipo_codigo || '—'} &nbsp;·&nbsp; Cliente: ${data.entrega_cliente}</div>
  </div>

  <!-- BODY -->
  <div style="background:#fff;padding:28px 32px">

    <!-- EQUIPO -->
    <div style="background:#f8f8f8;border-left:5px solid #C0392B;padding:16px 20px;margin-bottom:28px;border-radius:0 8px 8px 0">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#C0392B;margin-bottom:6px">${tipoLabel}</div>
      <div style="font-size:26px;font-weight:800;color:#1a1a1a;margin-bottom:4px">${data.equipo_codigo || '—'}</div>
      <div style="font-size:15px;color:#444">Cliente: ${data.entrega_cliente} &nbsp;/&nbsp; ${data.entrega_proyecto}</div>
    </div>

    <!-- RUTA -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #eee">Ruta del movimiento</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      <tr>
        <td width="46%" style="border:1.5px solid #e0e0e0;border-radius:8px;padding:16px;vertical-align:top">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px">Origen — Retiro</div>
          <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px">${origenNombre}</div>
          <div style="font-size:13px;color:#444;line-height:1.5">${origenDetalle}</div>
          ${contactoOrigen}
        </td>
        <td width="8%" style="text-align:center;vertical-align:middle;padding:0 8px">
          <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
            <line x1="0" y1="8" x2="22" y2="8" stroke="#C0392B" stroke-width="2.5"/>
            <polygon points="16,2 28,8 16,14" fill="#C0392B"/>
          </svg>
        </td>
        <td width="46%" style="border:1.5px solid #e0e0e0;border-radius:8px;padding:16px;vertical-align:top">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px">Destino — Entrega</div>
          <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px">${data.entrega_cliente}</div>
          <div style="font-size:13px;color:#444;line-height:1.5">Proyecto: ${data.entrega_proyecto}<br>${data.entrega_ubicacion || ''}</div>
          ${contactoDestino}
        </td>
      </tr>
    </table>

    <!-- DETALLES -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #eee">Detalles</div>
    <table width="100%" cellpadding="0" cellspacing="1" style="background:#e0e0e0;border-radius:8px;overflow:hidden;margin-bottom:28px">
      <tr>
        <td style="background:#fff;padding:14px 16px;width:33%">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Fecha movilizacion</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${fechaMovil}</div>
        </td>
        <td style="background:#fff;padding:14px 16px;width:33%">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Inicio alquiler</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${fechaAlq}</div>
        </td>
        <td style="background:#fff;padding:14px 16px;width:33%">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Solicitado por</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${data.vendedor}</div>
        </td>
      </tr>
      <tr>
        <td style="background:#fff;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Accesorio</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${data.accesorio_actual || '—'}</div>
        </td>
        <td style="background:#fff;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Tipo de equipo</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${data.equipo_tipo || '—'}</div>
        </td>
        <td style="background:#fff;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">&nbsp;</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">&nbsp;</div>
        </td>
      </tr>
    </table>

    <!-- CONDICIONES -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #eee">Condiciones</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:28px">
      <span style="font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;background:${operadorColor}">${operadorLabel}</span>
      <span style="font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;background:${dieselColor}">${dieselLabel}</span>
      <span style="font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;background:#fdf2f1;color:#C0392B;border:1.5px solid #e8c5c2">${propiedadLabel}</span>
    </div>

    ${notasHtml}

  </div>

  <!-- FOOTER -->
  <div style="background:#f8f8f8;border-top:1.5px solid #eee;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;border-radius:0 0 10px 10px">
    <span style="font-size:12px;color:#bbb">Super Mega Maquinas · Heavy Equipment Rental</span>
    <span style="font-size:10px;color:#ccc;font-family:monospace">${data.referencia}</span>
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
