
export default function handler(req, res) {
  // ───────────────────────────────────────────────
  //  Acceso protegido con HTTP Basic Auth
  //  Configura DASH_USER y DASH_PIN en Vercel → Settings → Environment Variables
  // ───────────────────────────────────────────────
  const user = process.env.DASH_USER;
  const pin  = process.env.DASH_PIN;

  if (!user || !pin) {
    return res.status(500).send('Faltan las variables de entorno DASH_USER / DASH_PIN en Vercel.');
  }

  const auth = req.headers.authorization || '';
  const expected = 'Basic ' + Buffer.from(`${user}:${pin}`).toString('base64');

  if (auth !== expected) {
    res.setHeader('WWW-Authenticate', 'Basic realm="SMM Seguimiento", charset="UTF-8"');
    res.status(401).send('Acceso restringido. Ingresa el usuario y PIN del equipo de operaciones.');
    return;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(HTML);
}

const HTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SMM — Seguimiento de Solicitudes</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
  :root{
    --red:#C0392B;--red-light:#fdf2f1;--gray-dark:#1a1a1a;--gray-mid:#6b6b6b;--gray-light:#f5f5f5;--gray-border:#e0e0e0;--white:#fff;
    --green:#1a7a4a;--green-light:#edf7f2;--yellow:#9a6a00;--yellow-light:#fff8e5;--blue:#245a9c;--blue-light:#eef5ff;
    --font:'Segoe UI',system-ui,-apple-system,sans-serif;--radius:8px;--radius-lg:12px;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:var(--font);background:var(--gray-light);color:var(--gray-dark);min-height:100vh}
  .header{background:var(--white);border-bottom:3px solid var(--red);box-shadow:0 1px 4px rgba(0,0,0,.08)}
  .header-inner{max-width:1180px;margin:0 auto;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px}
  .brand{font-size:28px;font-weight:900;letter-spacing:.04em;line-height:1}.brand-sub{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#999;margin-top:2px}
  .header-title{text-align:right}.header-title h1{font-size:18px;margin-bottom:4px}.header-title p{font-size:12px;color:var(--gray-mid)}
  .container{max-width:1180px;margin:0 auto;padding:22px 16px 60px}
  .toolbar{background:var(--white);border:.5px solid var(--gray-border);border-radius:var(--radius-lg);padding:16px;margin-bottom:16px}
  .toolbar-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr auto;gap:10px;align-items:end}
  label{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--gray-mid);margin-bottom:5px}
  input,select,textarea{width:100%;border:.5px solid var(--gray-border);border-radius:var(--radius);padding:9px 11px;font-size:13px;font-family:var(--font);background:#fff;color:var(--gray-dark)}
  textarea{resize:vertical;min-height:64px;line-height:1.45}
  input:focus,select:focus,textarea:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(192,57,43,.08)}
  .btn{border:none;border-radius:var(--radius);padding:10px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font);white-space:nowrap}
  .btn-red{background:var(--red);color:#fff}.btn-light{background:var(--gray-light);color:var(--gray-dark);border:.5px solid var(--gray-border)}.btn-green{background:var(--green);color:#fff}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}.stat{background:#fff;border:.5px solid var(--gray-border);border-radius:var(--radius-lg);padding:14px}.stat small{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--gray-mid);font-weight:700}.stat strong{display:block;font-size:28px;margin-top:4px}
  .table-card{background:var(--white);border:.5px solid var(--gray-border);border-radius:var(--radius-lg);overflow:hidden}.table-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:.5px solid var(--gray-border)}.table-head h2{font-size:15px}.table-head span{font-size:12px;color:var(--gray-mid)}
  table{width:100%;border-collapse:collapse}th,td{padding:12px 10px;text-align:left;border-bottom:.5px solid var(--gray-border);vertical-align:top}th{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--gray-mid);background:#fafafa}td{font-size:13px}.muted{color:var(--gray-mid);font-size:12px}.ref{font-weight:800}.client{font-weight:700}.equipment{font-weight:800;color:#111}.route{line-height:1.4}.nowrap{white-space:nowrap}
  .badge{display:inline-block;border-radius:999px;padding:4px 9px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}.badge-pendiente{background:var(--yellow-light);color:var(--yellow)}.badge-ejecutada{background:var(--green-light);color:var(--green)}.badge-cancelada{background:var(--red-light);color:var(--red)}.badge-programada{background:var(--blue-light);color:var(--blue)}
  .actions{display:flex;gap:6px;flex-wrap:wrap}.empty{padding:36px;text-align:center;color:var(--gray-mid)}
  .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.42);display:none;align-items:flex-start;justify-content:center;padding:32px 12px;z-index:20;overflow:auto}.modal{width:min(760px,100%);background:#fff;border-radius:var(--radius-lg);box-shadow:0 16px 48px rgba(0,0,0,.22);overflow:hidden}.modal-header{padding:16px 18px;border-bottom:.5px solid var(--gray-border);display:flex;justify-content:space-between;align-items:flex-start;gap:14px}.modal-header h3{font-size:17px}.modal-body{padding:18px}.modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.modal-full{grid-column:1/-1}.close{border:none;background:transparent;font-size:24px;line-height:1;cursor:pointer;color:var(--gray-mid)}.modal-footer{display:flex;justify-content:flex-end;gap:8px;padding:14px 18px;background:#fafafa;border-top:.5px solid var(--gray-border)}
  .detail-box{background:#fafafa;border:.5px solid var(--gray-border);border-radius:var(--radius);padding:12px;line-height:1.5}.detail-box b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--gray-mid);margin-bottom:4px}
  .toast{position:fixed;right:16px;bottom:16px;background:#111;color:#fff;border-radius:var(--radius);padding:12px 14px;font-size:13px;display:none;z-index:30;max-width:340px}.toast.error{background:#9f2f24}.toast.ok{background:#136c3f}
  @media(max-width:850px){.toolbar-grid{grid-template-columns:1fr 1fr}.stats{grid-template-columns:1fr 1fr}.hide-mobile{display:none}.table-card{overflow-x:auto}table{min-width:860px}.modal-grid{grid-template-columns:1fr}.header-inner{align-items:flex-start}.header-title{text-align:left}}
</style>
</head>
<body>
<header class="header">
  <div class="header-inner">
    <div><div class="brand">SMM</div><div class="brand-sub">Heavy Equipment Rental</div></div>
    <div class="header-title"><h1>Seguimiento de Solicitudes</h1><p>Control operativo de movilizaciones, desmovilizaciones, cambios y accesorios</p></div>
  </div>
</header>

<main class="container">
  <section class="toolbar">
    <div class="toolbar-grid">
      <div><label for="q">Buscar</label><input id="q" placeholder="Referencia, cliente, proyecto, equipo..."></div>
      <div><label for="estadoFiltro">Estado ejecución</label><select id="estadoFiltro"><option value="">Todos</option><option value="pendiente">Pendiente</option><option value="programada">Programada</option><option value="ejecutada">Ejecutada</option><option value="cancelada">Cancelada</option></select></div>
      <div><label for="tipoFiltro">Tipo</label><select id="tipoFiltro"><option value="">Todos</option><option value="movilizacion">Movilización</option><option value="desmovilizacion">Desmovilización</option><option value="cambio">Cambio de equipo</option><option value="accesorio">Solo accesorio</option></select></div>
      <div><label for="fechaFiltro">Fecha solicitada</label><input id="fechaFiltro" type="date"></div>
      <button class="btn btn-red" id="btnRefrescar">Actualizar</button>
    </div>
  </section>

  <section class="stats">
    <div class="stat"><small>Total</small><strong id="stTotal">0</strong></div>
    <div class="stat"><small>Pendientes</small><strong id="stPend">0</strong></div>
    <div class="stat"><small>Ejecutadas</small><strong id="stEjec">0</strong></div>
    <div class="stat"><small>Canceladas</small><strong id="stCanc">0</strong></div>
  </section>

  <section class="table-card">
    <div class="table-head"><h2>Solicitudes</h2><span id="countLabel">Cargando...</span></div>
    <div id="tableWrap"></div>
  </section>
</main>

<div class="modal-backdrop" id="modalBackdrop">
  <div class="modal">
    <div class="modal-header">
      <div><h3 id="modalTitle">Actualizar solicitud</h3><p class="muted" id="modalSub"></p></div>
      <button class="close" id="btnClose" aria-label="Cerrar">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-grid">
        <div class="detail-box"><b>Equipo solicitado</b><span id="mEquipo"></span></div>
        <div class="detail-box"><b>Cliente / Proyecto</b><span id="mCliente"></span></div>
        <div><label for="mEstado">Estado ejecución</label><select id="mEstado"><option value="pendiente">Pendiente</option><option value="programada">Programada</option><option value="ejecutada">Ejecutada</option><option value="cancelada">Cancelada</option></select></div>
        <div><label for="mFechaReal">Fecha real ejecución</label><input id="mFechaReal" type="date"></div>
        <div><label for="mEquipoReal">Equipo real asignado</label><input id="mEquipoReal" placeholder="Ej. E-05-2, E-21-2, MAEX-04"></div>
        <div><label for="mRecibo">Foto / recibo</label><input id="mRecibo" type="file" accept="image/*,.pdf"></div>
        <div class="modal-full"><label for="mNotas">Notas de ejecución</label><textarea id="mNotas" placeholder="Cambios, observaciones, incidencias, contacto en sitio..."></textarea></div>
        <div class="modal-full detail-box" id="mReciboActualBox" style="display:none"><b>Recibo actual</b><a id="mReciboActual" href="#" target="_blank" rel="noopener">Abrir archivo</a></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-light" id="btnCancel">Cancelar</button><button class="btn btn-green" id="btnSave">Guardar cambios</button></div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
const SUPABASE_URL = "https://ujoxrtwyfsqabhrjtjlr.supabase.co";
const SUPABASE_KEY = "sb_publishable_skDHEZ0PRVa3z-3fAaw4lw_v3LD0TSA";

// IMPORTANTE: reemplaza SUPABASE_KEY por el mismo anon key público usado en index.html.
// No uses service_role aquí. Las políticas RLS deben permitir SELECT/UPDATE y Storage según el SQL adjunto.

const BUCKET_RECIBOS = 'recibos';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let solicitudes = [];
let seleccionada = null;

const $ = id => document.getElementById(id);
const fmt = f => f ? String(f).split('-').reverse().join('/') : '—';
const safe = v => String(v ?? '').replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
const normalize = v => String(v ?? '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'');

function estadoOf(s){ return s.estado_ejecucion || s.estado || 'pendiente'; }
function equipoOf(s){ return s.tipo === 'cambio' ? \`\${s.equipo_sale || '—'} ⇄ \${s.equipo_entra || '—'}\` : (s.equipo_codigo || '—'); }
function clienteOf(s){ return s.cliente_principal || s.entrega_cliente || s.retiro_cliente || ''; }
function proyectoOf(s){ return s.proyecto_principal || s.entrega_proyecto || s.retiro_proyecto || ''; }
function tipoLabel(t){ return ({movilizacion:'Movilización',desmovilizacion:'Desmovilización',cambio:'Cambio',accesorio:'Accesorio'}[t] || t || '—'); }

function showToast(msg, type='ok'){
  const t = $('toast'); t.textContent = msg; t.className = \`toast \${type}\`; t.style.display='block';
  setTimeout(()=>{ t.style.display='none'; }, 3200);
}

async function cargarSolicitudes(){
  $('countLabel').textContent = 'Cargando...';
  const { data, error } = await sb.from('solicitudes').select('*').order('fecha_solicitud', { ascending:false }).limit(500);
  if(error){
    console.error(error); $('tableWrap').innerHTML = \`<div class="empty">Error cargando solicitudes: \${safe(error.message)}</div>\`; $('countLabel').textContent='Error'; return;
  }
  solicitudes = data || [];
  render();
}

function filtrar(){
  const q = normalize($('q').value);
  const estado = $('estadoFiltro').value;
  const tipo = $('tipoFiltro').value;
  const fecha = $('fechaFiltro').value;
  return solicitudes.filter(s => {
    const blob = normalize([s.referencia,s.tipo,s.subtipo,s.vendedor,clienteOf(s),proyectoOf(s),equipoOf(s),s.retiro_ubicacion,s.entrega_ubicacion,s.notas].join(' '));
    if(q && !blob.includes(q)) return false;
    if(estado && estadoOf(s) !== estado) return false;
    if(tipo && s.tipo !== tipo) return false;
    if(fecha && s.fecha_movilizacion !== fecha) return false;
    return true;
  });
}

function render(){
  const rows = filtrar();
  $('countLabel').textContent = \`\${rows.length} de \${solicitudes.length} solicitudes\`;
  $('stTotal').textContent = solicitudes.length;
  $('stPend').textContent = solicitudes.filter(s => estadoOf(s)==='pendiente' || estadoOf(s)==='programada').length;
  $('stEjec').textContent = solicitudes.filter(s => estadoOf(s)==='ejecutada').length;
  $('stCanc').textContent = solicitudes.filter(s => estadoOf(s)==='cancelada').length;

  if(!rows.length){ $('tableWrap').innerHTML = '<div class="empty">No hay solicitudes para los filtros seleccionados.</div>'; return; }
  $('tableWrap').innerHTML = \`<table><thead><tr>
    <th>Referencia</th><th>Fecha</th><th>Tipo</th><th>Equipo</th><th>Cliente / Proyecto</th><th class="hide-mobile">Ruta</th><th>Estado</th><th>Acción</th>
  </tr></thead><tbody>\${rows.map(rowHtml).join('')}</tbody></table>\`;
}

function rowHtml(s){
  const estado = estadoOf(s);
  const ruta = \`\${s.retiro_cliente || s.origen || '—'} → \${s.entrega_cliente || '—'}\`;
  const fechaReal = s.fecha_real ? \`<div class="muted">Real: \${fmt(s.fecha_real)}</div>\` : '';
  return \`<tr>
    <td><div class="ref">\${safe(s.referencia || '—')}</div><div class="muted">\${safe(s.vendedor || '')}</div></td>
    <td class="nowrap"><div>\${fmt(s.fecha_movilizacion)}</div>\${fechaReal}<div class="muted">Solicitud: \${fmt((s.fecha_solicitud||'').slice(0,10))}</div></td>
    <td>\${safe(tipoLabel(s.tipo))}\${s.subtipo ? \`<div class="muted">\${safe(s.subtipo)}</div>\`:''}</td>
    <td><div class="equipment">\${safe(equipoOf(s))}</div>\${s.equipo_real ? \`<div class="muted">Real: \${safe(s.equipo_real)}</div>\`:''}</td>
    <td><div class="client">\${safe(clienteOf(s) || '—')}</div><div class="muted">\${safe(proyectoOf(s) || '')}</div></td>
    <td class="hide-mobile route">\${safe(ruta)}\${s.entrega_ubicacion ? \`<div class="muted">\${safe(s.entrega_ubicacion)}</div>\`:''}</td>
    <td><span class="badge badge-\${safe(estado)}">\${safe(estado)}</span></td>
    <td><div class="actions"><button class="btn btn-light" onclick="abrir('\${safe(s.referencia)}')">Editar</button>\${s.url_recibo ? \`<a class="btn btn-light" href="\${safe(s.url_recibo)}" target="_blank" rel="noopener">Recibo</a>\`:''}</div></td>
  </tr>\`;
}

window.abrir = function(ref){
  seleccionada = solicitudes.find(s => s.referencia === ref);
  if(!seleccionada) return;
  $('modalTitle').textContent = \`Actualizar \${seleccionada.referencia || ''}\`;
  $('modalSub').textContent = \`\${tipoLabel(seleccionada.tipo)} · \${fmt(seleccionada.fecha_movilizacion)}\`;
  $('mEquipo').textContent = equipoOf(seleccionada);
  $('mCliente').textContent = \`\${clienteOf(seleccionada) || '—'}\${proyectoOf(seleccionada) ? ' / ' + proyectoOf(seleccionada) : ''}\`;
  $('mEstado').value = estadoOf(seleccionada);
  $('mFechaReal').value = seleccionada.fecha_real || '';
  $('mEquipoReal').value = seleccionada.equipo_real || '';
  $('mNotas').value = seleccionada.notas_ejecucion || '';
  $('mRecibo').value = '';
  if(seleccionada.url_recibo){ $('mReciboActualBox').style.display='block'; $('mReciboActual').href = seleccionada.url_recibo; }
  else { $('mReciboActualBox').style.display='none'; }
  $('modalBackdrop').style.display='flex';
}

function cerrar(){ $('modalBackdrop').style.display='none'; seleccionada=null; }

async function subirRecibo(file, ref){
  if(!file) return null;
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const path = \`\${ref}/\${Date.now()}-\${Math.random().toString(16).slice(2)}.\${ext}\`;
  const { error } = await sb.storage.from(BUCKET_RECIBOS).upload(path, file, { upsert:false, contentType:file.type || undefined });
  if(error) throw error;
  const { data } = sb.storage.from(BUCKET_RECIBOS).getPublicUrl(path);
  return data.publicUrl;
}

async function guardarCambios(){
  if(!seleccionada) return;
  $('btnSave').disabled = true;
  try{
    let urlRecibo = seleccionada.url_recibo || null;
    const file = $('mRecibo').files[0];
    if(file) urlRecibo = await subirRecibo(file, seleccionada.referencia);
    const patch = {
      estado_ejecucion: $('mEstado').value,
      fecha_real: $('mFechaReal').value || null,
      equipo_real: $('mEquipoReal').value.trim() || null,
      notas_ejecucion: $('mNotas').value.trim() || null,
      url_recibo: urlRecibo,
      actualizado_en: new Date().toISOString()
    };
    const { error } = await sb.from('solicitudes').update(patch).eq('referencia', seleccionada.referencia);
    if(error) throw error;
    showToast('Solicitud actualizada.');
    cerrar();
    await cargarSolicitudes();
  } catch(err){
    console.error(err); showToast(\`Error guardando: \${err.message || err}\`, 'error');
  } finally { $('btnSave').disabled = false; }
}

['q','estadoFiltro','tipoFiltro','fechaFiltro'].forEach(id => $(id).addEventListener('input', render));
$('btnRefrescar').addEventListener('click', cargarSolicitudes);
$('btnClose').addEventListener('click', cerrar);
$('btnCancel').addEventListener('click', cerrar);
$('btnSave').addEventListener('click', guardarCambios);
$('modalBackdrop').addEventListener('click', e => { if(e.target.id === 'modalBackdrop') cerrar(); });

cargarSolicitudes();
</script>
</body>
</html>
`;
