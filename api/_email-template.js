// ============================================================
//  Módulo compartido: construye el correo completo de SMM.
//  Usado por send-email.js (solicitud) y aprobar.js (al aprobar).
//  Devuelve { subjectDirecto, subjectAprob, htmlContent }.
//  opts.bannerOverride  -> texto del banner (ej. "✅ Cambio APROBADA — ... | Cliente")
//  opts.bannerColor     -> color de fondo del banner (default rojo #C0392B)
// ============================================================
export function construirEmail(d, opts = {}) {
  const requiereAprobacion =
    d.tipo === 'movilizacion' ||
    d.tipo === 'cambio' ||
    (d.tipo === 'accesorio' && (d.subtipo === 'movilizacion' || d.subtipo === 'cambio'));

  const tipos = { movilizacion:'Movilizacion', desmovilizacion:'Desmovilizacion', cambio:'Cambio de Equipos', accesorio:'Accesorio' };
  const subt  = { movilizacion:'Movilizacion', desmovilizacion:'Desmovilizacion', cambio:'Cambio' };

  let tipoLabel = tipos[d.tipo] || d.tipo;
  if (d.tipo === 'accesorio') tipoLabel = (subt[d.subtipo] || '') + ' de accesorio';

  const esDesmovil = d.tipo === 'desmovilizacion' || (d.tipo === 'accesorio' && d.subtipo === 'desmovilizacion');
  const cliente  = d.cliente_principal || d.entrega_cliente || '';
  const proyecto = d.proyecto_principal || d.entrega_proyecto || '';

  // Asunto
  const ALERTA = '🚨';
  let subjectDetalle;
  if (d.tipo === 'cambio') {
    const saleTxt  = (d.tipo_sale  ? d.tipo_sale  + ' ' : '') + (d.equipo_sale  || '');
    const entraTxt = (d.tipo_entra ? d.tipo_entra + ' ' : '') + (d.equipo_entra || '');
    subjectDetalle = `${saleTxt} ⇄ ${entraTxt}`;
  } else {
    const tipoSing = d.equipo_tipo_singular || '';
    subjectDetalle = (tipoSing ? tipoSing + ' ' : '') + (d.equipo_codigo || '');
  }
  const tipoSubj = d.tipo === 'cambio' ? 'Cambio de Equipos' : tipoLabel;

  // Asunto cuando NO requiere aprobación (flujo directo, como hoy)
  const subjectDirecto = `${ALERTA} Nueva solicitud de ${tipoSubj} — ${subjectDetalle} | ${cliente}`;
  // Asunto del correo a gerentes (pidiendo aprobación)
  const subjectAprob = `🔔 Aprobación requerida — ${tipoSubj} ${subjectDetalle} | ${cliente}`;
  // El subject "principal" del cuerpo (banner) usa el que aplique
  const subject = requiereAprobacion ? subjectAprob : subjectDirecto;

  const fmt = f => f ? f.split('-').reverse().join('/') : '—';
  const fechaMovil = fmt(d.fecha_movilizacion);
  const fechaAlq   = fmt(d.fecha_inicio_alquiler);
  const lblFecha1  = esDesmovil ? 'Fecha desmovilizacion' : 'Fecha movilizacion';
  const lblFecha2  = esDesmovil ? 'Fin de alquiler' : 'Inicio alquiler';

  const propiedadLabel = d.propiedad === 'smm' ? 'Equipo SMM' : 'Equipo Subarrendado';
  const operadorLabel  = d.operador ? 'Operador incluido' : 'Sin operador';
  const dieselLabel    = d.diesel   ? 'Diesel incluido'   : 'Sin diesel';
  const opStyle  = d.operador ? '#e8f5ee;color:#1a7a4a;border:1.5px solid #b8e0cc' : '#f8f8f8;color:#666;border:1.5px solid #e0e0e0';
  const diStyle  = d.diesel   ? '#e8f5ee;color:#1a7a4a;border:1.5px solid #b8e0cc' : '#f8f8f8;color:#666;border:1.5px solid #e0e0e0';
  const esEquipoTipo = d.tipo === 'movilizacion' || d.tipo === 'desmovilizacion';

  const condicionesHtml = `
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #eee">Condiciones</div>
    <table cellpadding="0" cellspacing="0"><tr>
      ${esEquipoTipo ? `<td style="padding-right:10px"><span style="display:inline-block;font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;background:${opStyle}">${operadorLabel}</span></td>
      <td style="padding-right:10px"><span style="display:inline-block;font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;background:${diStyle}">${dieselLabel}</span></td>` : ''}
      <td><span style="display:inline-block;font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;background:#fdf2f1;color:#C0392B;border:1.5px solid #e8c5c2">${propiedadLabel}</span></td>
    </tr></table>`;

  const notasHtml = d.notas ? `
    <div style="background:#fffbf0;border:1.5px solid #f0e0a0;border-radius:8px;padding:16px;margin-top:24px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#c8a030;margin-bottom:6px">Notas / Instrucciones</div>
      <div style="font-size:14px;color:#6b4c00;line-height:1.6">${d.notas}</div>
    </div>` : '';

  // Detalle accesorio del equipo
  let accesorioInfo = d.accesorio_actual || '—';
  if (d.tipo === 'accesorio' && d.subtipo === 'cambio' && d.accesorio_entra) accesorioInfo = `Sale: ${d.equipo_codigo} / Entra: ${d.accesorio_entra}`;

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

  // Helpers de "ruta" (caja origen/destino con flecha)
  const flechaSVG = `<svg width="28" height="16" viewBox="0 0 28 16" fill="none"><line x1="0" y1="8" x2="22" y2="8" stroke="#C0392B" stroke-width="2.5"/><polygon points="16,2 28,8 16,14" fill="#C0392B"/></svg>`;
  const rutaCaja = (titulo, nombre, detalle, contacto) => {
    const cont = contacto
      ? `<div style="font-size:12px;color:#555;margin-top:8px;padding-top:8px;border-top:1px solid #eee"><b style="color:#1a1a1a">Contacto:</b> ${contacto}</div>` : '';
    return `<td width="46%" style="border:1.5px solid #e0e0e0;border-radius:8px;padding:16px;vertical-align:top">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px">${titulo}</div>
        <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px">${nombre || '—'}</div>
        <div style="font-size:13px;color:#444;line-height:1.5">${detalle || ''}</div>
        ${cont}
      </td>`;
  };
  const rutaTabla = (origenCaja, destinoCaja) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px"><tr>
      ${origenCaja}
      <td width="8%" style="text-align:center;vertical-align:middle;padding:0 8px">${flechaSVG}</td>
      ${destinoCaja}
    </tr></table>`;
  const tituloSeccion = txt => `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #eee">${txt}</div>`;

  // Bloque principal (equipo + cliente)
  let bloqueEquipo;
  let saleLabel, entraLabel;
  if (d.tipo === 'cambio') {
    saleLabel  = (d.tipo_sale  ? d.tipo_sale  + ' ' : '') + (d.equipo_sale  || '—');
    entraLabel = (d.tipo_entra ? d.tipo_entra + ' ' : '') + (d.equipo_entra || '—');
    bloqueEquipo = `
      <div style="border-left:5px solid #C0392B;padding:16px 20px;background:#fafafa;margin-bottom:28px;border-radius:0 8px 8px 0">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#C0392B;margin-bottom:8px">Cambio de Equipos</div>
        <table cellpadding="0" cellspacing="0" width="100%"><tr>
          <td style="vertical-align:top;padding-right:14px">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#999;margin-bottom:3px">Sale</div>
            <div style="font-size:20px;font-weight:800;color:#1a1a1a">${saleLabel}</div>
            <div style="font-size:12px;color:#666">→ ${d.destino_saliente || 'Galera SMM'}</div>
          </td>
          <td style="vertical-align:middle;padding:0 8px;font-size:22px;color:#C0392B;font-weight:700">⇄</td>
          <td style="vertical-align:top;padding-left:14px">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#999;margin-bottom:3px">Entra</div>
            <div style="font-size:20px;font-weight:800;color:#1a1a1a">${entraLabel}</div>
            <div style="font-size:12px;color:#666">← ${d.origen_entrante || 'Galera SMM'}</div>
          </td>
        </tr></table>
        <div style="font-size:15px;color:#444;margin-top:12px;padding-top:12px;border-top:1px solid #eee">Cliente: <b>${cliente}</b> &nbsp;/&nbsp; ${proyecto}</div>
      </div>`;
  } else {
    const tipoPrefix = d.equipo_tipo_singular || (d.equipo_tipo && d.equipo_tipo !== 'Accesorio' ? d.equipo_tipo : '');
    const compatibleHtml = (d.tipo === 'accesorio' && d.equipo_compatible)
      ? `<div style="font-size:13px;color:#C0392B;font-weight:700;margin-top:6px">⚙ Para equipo: ${d.equipo_compatible} <span style="font-weight:500;color:#888">(del cliente)</span></div>`
      : '';
    bloqueEquipo = `
      <div style="border-left:5px solid #C0392B;padding:16px 20px;background:#fafafa;margin-bottom:28px;border-radius:0 8px 8px 0">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#C0392B;margin-bottom:6px">${tipoLabel}</div>
        <div style="font-size:24px;font-weight:800;color:#1a1a1a;margin-bottom:4px">${tipoPrefix ? tipoPrefix + ' — ' : ''}${d.equipo_codigo || '—'}</div>
        <div style="font-size:15px;color:#444">Cliente: <b>${cliente}</b>${proyecto ? ' &nbsp;/&nbsp; ' + proyecto : ''}</div>
        ${compatibleHtml}
      </div>`;
  }

  // Ruta
  let rutaHtml;
  if (d.tipo === 'cambio') {
    const ubicCambio = (d.entrega_proyecto ? 'Proyecto: ' + d.entrega_proyecto + '<br>' : '') + (d.entrega_ubicacion || '');
    rutaHtml = `
    ${tituloSeccion('Ruta — ' + saleLabel + ' (sale)')}
    ${rutaTabla(
      rutaCaja('Origen — Retiro', d.entrega_cliente, ubicCambio, d.entrega_contacto),
      rutaCaja('Destino — Entrega', d.destino_saliente || 'Galera SMM', d.destino_saliente_direccion || '', d.destino_saliente_contacto)
    )}
    ${tituloSeccion('Ruta — ' + entraLabel + ' (entra)')}
    ${rutaTabla(
      rutaCaja('Origen — Retiro', d.origen_entrante || 'Galera SMM', d.origen_entrante_direccion || '', d.origen_entrante_contacto),
      rutaCaja('Destino — Entrega', d.entrega_cliente, ubicCambio, d.entrega_contacto)
    )}
    <div style="margin-bottom:12px"></div>`;
  } else {
    rutaHtml = `
    ${tituloSeccion('Ruta del movimiento')}
    ${rutaTabla(
      rutaCaja('Origen — Retiro', d.retiro_cliente, (d.retiro_proyecto ? 'Proyecto: ' + d.retiro_proyecto + '<br>' : '') + (d.retiro_ubicacion || ''), d.retiro_contacto),
      rutaCaja('Destino — Entrega', d.entrega_cliente, (d.entrega_proyecto ? 'Proyecto: ' + d.entrega_proyecto + '<br>' : '') + (d.entrega_ubicacion || ''), d.entrega_contacto)
    )}
    <div style="margin-bottom:12px"></div>`;
  }

  const bannerColor = opts.bannerColor || '#C0392B';
  const bannerTexto = opts.bannerOverride || subject;

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#e8e8e8;font-family:'Segoe UI',system-ui,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:20px 0">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-bottom:4px solid ${bannerColor};border-radius:10px 10px 0 0"><tr>
    <td style="padding:22px 32px;vertical-align:middle">
      <div style="font-size:28px;font-weight:900;letter-spacing:.04em;color:#1a1a1a;line-height:1">SMM</div>
      <div style="font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#999;margin-top:3px">Heavy Equipment Rental</div>
    </td>
    <td style="padding:22px 32px;vertical-align:middle;text-align:right">
      <div style="font-size:12px;color:#999;line-height:1.7">${new Date().toLocaleDateString('es-PA',{day:'numeric',month:'short',year:'numeric',timeZone:'America/Panama'})}<br>${new Date().toLocaleTimeString('es-PA',{hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'})}</div>
    </td>
  </tr></table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:${bannerColor}"><tr>
    <td style="padding:16px 24px;vertical-align:middle;width:60px">${excavadoraSVG}</td>
    <td style="padding:16px 24px 16px 0;vertical-align:middle">
      <div style="font-size:15px;font-weight:700;color:#fff;line-height:1.4">${bannerTexto.replace(' | ', '<br>Cliente: ')}</div>
    </td>
  </tr></table>

  <div style="background:#fff;padding:28px 32px">
    ${bloqueEquipo}
    ${rutaHtml}

    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #eee">Detalles</div>
    <table width="100%" cellpadding="0" cellspacing="1" style="background:#e0e0e0;border-radius:8px;overflow:hidden;margin-bottom:28px">
      <tr>
        <td style="background:#fff;padding:14px 16px;width:33%">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">${lblFecha1}</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${fechaMovil}</div>
        </td>
        <td style="background:#fff;padding:14px 16px;width:33%">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">${lblFecha2}</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${fechaAlq}</div>
        </td>
        <td style="background:#fff;padding:14px 16px;width:33%">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Solicitado por</div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a">${d.vendedor || '—'}</div>
        </td>
      </tr>
      <tr>
        <td style="background:#fff;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Accesorio</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${accesorioInfo}</div>
        </td>
        <td style="background:#fff;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Tipo / Familia</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${d.equipo_tipo || '—'}</div>
        </td>
        <td style="background:#fff;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#bbb;margin-bottom:5px">Tipo solicitud</div>
          <div style="font-size:13px;font-weight:600;color:#1a1a1a">${tipoLabel}</div>
        </td>
      </tr>
    </table>

    ${condicionesHtml}
    ${notasHtml}
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-top:1.5px solid #eee;border-radius:0 0 10px 10px"><tr>
    <td style="padding:14px 32px;vertical-align:middle">
      <span style="font-size:12px;color:#bbb">Super Mega Maquinas &middot; Heavy Equipment Rental</span>
    </td>
    <td style="padding:14px 32px;vertical-align:middle;text-align:right">
      <span style="font-size:10px;color:#ccc;font-family:monospace">${d.referencia || ''}</span>
    </td>
  </tr></table>

</div>
</body></html>`;


  return { subjectDirecto, subjectAprob, htmlContent, requiereAprobacion };
}

