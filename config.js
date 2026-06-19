// ============================================================
//  SMM — ARCHIVO DE CONFIGURACIÓN
//  Edita este archivo para actualizar equipos, vendedores,
//  accesorios y correos. No necesitas tocar index.html.
// ============================================================

// ------------------------------------------------------------
//  1. VENDEDORES / SOLICITANTES
//     Cada uno con su correo (para avisarle si su solicitud es rechazada).
//     EN PRUEBAS: todos apuntan al correo de Emir. Reemplazar por los reales luego.
// ------------------------------------------------------------
const VENDEDORES = [
  { nombre: "Vanesa Patiño",   email: "vanesa.patino@smm.com.pa" },
  { nombre: "Ernesto Kochman", email: "ek@smm.com.pa" },
  { nombre: "Tomas Aguilar",   email: "tomas.aguilar@smm.com.pa" },
  { nombre: "Emir Quiros",     email: "emir.quiros@smm.com.pa" },
  { nombre: "Tony Parra",      email: "tony_parra@smm.com.pa" },];

// ------------------------------------------------------------
//  2. DESTINATARIOS DE ALERTAS (informativo — el envío real
//     se configura en api/send-email.js)
// ------------------------------------------------------------
const EMAILS_ALERTA = [
  "emir.quiros@infratec.com.pa",
];

// ------------------------------------------------------------
//  2B. GERENTES APROBADORES (reciben el correo con botones
//     Aprobar/Rechazar). EN PRUEBAS: solo Emir.
// ------------------------------------------------------------
const EMAILS_GERENTES = [
  "emir.quiros@infratec.com.pa",
];

// ------------------------------------------------------------
//  3. FAMILIAS DE EQUIPOS
// ------------------------------------------------------------
const FAMILIAS = {
  excavadora:      "Excavadoras",
  retroexcavadora: "Retroexcavadoras",
  miniexcavadora:  "Miniexcavadoras",
  minicargador:    "Minicargadores",
  telehandler:     "Telehandlers",
  compactadora:    "Compactadoras / Rolas",
  bulldozer:       "Bulldozers",
  motoniveladora:  "Motoniveladoras",
};

// ------------------------------------------------------------
//  3B. FAMILIAS — nombre en singular (para asunto/cuerpo de email)
// ------------------------------------------------------------
const FAMILIAS_SINGULAR = {
  excavadora:      "Excavadora",
  retroexcavadora: "Retroexcavadora",
  miniexcavadora:  "Miniexcavadora",
  minicargador:    "Minicargador",
  telehandler:     "Telehandler",
  compactadora:    "Compactadora",
  bulldozer:       "Bulldozer",
  motoniveladora:  "Motoniveladora",
};

// ------------------------------------------------------------
//  4. EQUIPOS  { codigo, tipo (familia), desc }
// ------------------------------------------------------------
const EQUIPOS = [
  // EXCAVADORAS
  { codigo:"E-01-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-02-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-03-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-04-LR", tipo:"excavadora", desc:"Excavadora brazo largo" },
  { codigo:"E-05-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-06-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-08-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-09-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-10-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-11",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-12-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-13-LR", tipo:"excavadora", desc:"Excavadora brazo largo" },
  { codigo:"E-14-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-15-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-16-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-17-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-18-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-19-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-20-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-21-2",  tipo:"excavadora", desc:"Excavadora brazo largo" },
  { codigo:"E-22-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-23",    tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-24",    tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-25-2",  tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-26",    tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-27",    tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-28",    tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"E-29",    tipo:"excavadora", desc:"Excavadora hidráulica" },
  { codigo:"ER-02",   tipo:"excavadora", desc:"Excavadora sobre ruedas" },
  { codigo:"ER-03-2", tipo:"excavadora", desc:"Excavadora sobre ruedas" },

  // RETROEXCAVADORAS
  { codigo:"R-02-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-03-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-04-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-05-3", tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-06-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-07-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-08-3", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-09-2", tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-09-3", tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-11-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-14-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-15-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-17-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-18-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-19-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-20-2", tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-21-2", tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-22-2", tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-23",   tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-24",   tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-25",   tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-26",   tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-27",   tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },
  { codigo:"R-28",   tipo:"retroexcavadora", desc:"Retro con kit de martillo" },
  { codigo:"R-29",   tipo:"retroexcavadora", desc:"Retro sin kit de martillo" },

  // MINIEXCAVADORAS
  { codigo:"ME-01",   tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-02-2", tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-03",   tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-05-2", tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-06",   tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-07-2", tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-08",   tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-10-2", tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-11",   tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-12",   tipo:"miniexcavadora", desc:"Miniexcavadora" },
  { codigo:"ME-13",   tipo:"miniexcavadora", desc:"Miniexcavadora" },

  // MINICARGADORES
  { codigo:"M-01-3", tipo:"minicargador", desc:"Minicargador" },
  { codigo:"M-03-3", tipo:"minicargador", desc:"Minicargador" },
  { codigo:"M-04-2", tipo:"minicargador", desc:"Minicargador" },
  { codigo:"M-05-2", tipo:"minicargador", desc:"Minicargador" },

  // TELEHANDLERS
  { codigo:"TH-02", tipo:"telehandler", desc:"Telehandler" },
  { codigo:"TH-03", tipo:"telehandler", desc:"Telehandler" },

  // COMPACTADORAS / ROLAS
  { codigo:"C-01-3",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-02-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-03-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-04-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-07-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-08-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-09-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-10-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-11",    tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-12-2",  tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-14",    tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-15",    tipo:"compactadora", desc:"Compactadora" },
  { codigo:"C-16",    tipo:"compactadora", desc:"Compactadora" },
  { codigo:"CT-01-2", tipo:"compactadora", desc:"Compactadora 4 ton" },
  { codigo:"CT-06",   tipo:"compactadora", desc:"Compactadora 4 ton" },
  { codigo:"CT-08",   tipo:"compactadora", desc:"Compactadora 4 ton" },
  { codigo:"CT-09",   tipo:"compactadora", desc:"Compactadora 4 ton" },

  // BULLDOZERS
  { codigo:"T-01-2", tipo:"bulldozer", desc:"Bulldozer" },
  { codigo:"T-02-3", tipo:"bulldozer", desc:"Bulldozer" },
  { codigo:"T-04-2", tipo:"bulldozer", desc:"Bulldozer" },
  { codigo:"T-05-2", tipo:"bulldozer", desc:"Bulldozer" },
  { codigo:"T-06-2", tipo:"bulldozer", desc:"Bulldozer" },
  { codigo:"T-07-2", tipo:"bulldozer", desc:"Bulldozer" },
  { codigo:"T-08-2", tipo:"bulldozer", desc:"Bulldozer" },
  { codigo:"T-09-2", tipo:"bulldozer", desc:"Bulldozer" },

  // MOTONIVELADORAS
  { codigo:"MN-01",   tipo:"motoniveladora", desc:"Motoniveladora" },
  { codigo:"MN-02",   tipo:"motoniveladora", desc:"Motoniveladora" },
  { codigo:"MN-03",   tipo:"motoniveladora", desc:"Motoniveladora" },
  { codigo:"MN-04",   tipo:"motoniveladora", desc:"Motoniveladora" },
  { codigo:"MN-04-1", tipo:"motoniveladora", desc:"Motoniveladora" },
];

// ------------------------------------------------------------
//  5. ACCESORIOS POR FAMILIA (default y opcionales del equipo)
// ------------------------------------------------------------
const ACCESORIOS_POR_TIPO = {
  excavadora:      { default:"Balde",            opcionales:["Martillo hidráulico"] },
  retroexcavadora: { default:"Balde",            opcionales:["Martillo hidráulico"] },
  miniexcavadora:  { default:"Balde",            opcionales:["Martillo hidráulico"] },
  minicargador:    { default:"Balde",            opcionales:["Barredora","Orquilla"] },
  telehandler:     { default:"Orquilla",         opcionales:["Balde"] },
  compactadora:    { default:"Lisa (sin forro)", opcionales:["Forro de piña"] },
};

// ------------------------------------------------------------
//  6. CATÁLOGO DE ACCESORIOS POR CATEGORÍA
//     clase = compatibilidad / clasificación técnica
// ------------------------------------------------------------
const CATEGORIAS_ACCESORIOS = [
  { id:"maex",     label:"Martillos para excavadora (MAEX)",          tipo:"Martillo" },
  { id:"mare",     label:"Martillos para retroexcavadora / mini (MARE)", tipo:"Martillo" },
  { id:"balde",    label:"Baldes",                                    tipo:"Balde" },
  { id:"orquilla", label:"Orquillas",                                 tipo:"Orquilla" },
  { id:"barredora",label:"Barredoras (BARR)",                         tipo:"Barredora" },
  { id:"forro",    label:"Forros de piña (FOR)",                      tipo:"Forro" },
];

const ACCESORIOS = [
  // MARTILLOS EXCAVADORA — clasificados por tonelaje del equipo portador
  { codigo:"MAEX-01",   cat:"maex", nombre:"Soosan SB70TS",    clase:"Excavadora 18–26 t" },
  { codigo:"MAEX-02",   cat:"maex", nombre:"Soosan SB70",      clase:"Excavadora 18–26 t" },
  { codigo:"MAEX-03",   cat:"maex", nombre:"Soosan SB70",      clase:"Excavadora 18–26 t" },
  { codigo:"MAEX-04",   cat:"maex", nombre:"Soosan SB70",      clase:"Excavadora 18–26 t" },
  { codigo:"MAEX-05",   cat:"maex", nombre:"Soosan SB70",      clase:"Excavadora 18–26 t" },
  { codigo:"MAEX-06",   cat:"maex", nombre:"Soosan SB70TS",    clase:"Excavadora 18–26 t" },
  { codigo:"MAEX-07",   cat:"maex", nombre:"Soosan SB50TS-P",  clase:"Excavadora 11–16 t" },
  { codigo:"MAEX-08",   cat:"maex", nombre:"Soosan SB121TS-P", clase:"Excavadora 26–40 t" },
  { codigo:"MAEX-09-2", cat:"maex", nombre:"Soosan SB125TS-P", clase:"Excavadora 26–40 t" },
  { codigo:"MAEX-10",   cat:"maex", nombre:"Soosan SB50",      clase:"Excavadora 11–16 t" },
  { codigo:"MAEX-11",   cat:"maex", nombre:"Soosan SB50",      clase:"Excavadora 11–16 t" },
  { codigo:"MAEX-12",   cat:"maex", nombre:"Soosan SB70TS-P",  clase:"Excavadora 18–26 t" },

  // MARTILLOS RETRO / MINI — SB20TS-P es para miniexcavadora
  { codigo:"MARE-01",   cat:"mare", nombre:"Soosan SB-43",     clase:"Retroexcavadora" },
  { codigo:"MARE-02",   cat:"mare", nombre:"Soosan SB-43",     clase:"Retroexcavadora" },
  { codigo:"MARE-03",   cat:"mare", nombre:"AJCE AB430M",      clase:"Retroexcavadora" },
  { codigo:"MARE-04",   cat:"mare", nombre:"Soosan SB-43",     clase:"Retroexcavadora" },
  { codigo:"MARE-05",   cat:"mare", nombre:"Soosan SB43-TS-P", clase:"Retroexcavadora" },
  { codigo:"MARE-06",   cat:"mare", nombre:"Soosan SB43-TS-P", clase:"Retroexcavadora" },
  { codigo:"MARE-07",   cat:"mare", nombre:"Soosan SB-43TS-P", clase:"Retroexcavadora" },
  { codigo:"MARE-08",   cat:"mare", nombre:"AJCE AB430M",      clase:"Retroexcavadora" },
  { codigo:"MARE-09",   cat:"mare", nombre:"Soosan SB-43",     clase:"Retroexcavadora" },
  { codigo:"MARE-10",   cat:"mare", nombre:"Soosan SB-43",     clase:"Retroexcavadora" },
  { codigo:"MARE-11",   cat:"mare", nombre:"Soosan SB20TS-P",  clase:"Miniexcavadora 3–6 t" },
  { codigo:"MARE-12",   cat:"mare", nombre:"Soosan SB43E-TOP", clase:"Retroexcavadora" },
  { codigo:"MARE-13",   cat:"mare", nombre:"Soosan SB43E-TOP", clase:"Retroexcavadora" },
  { codigo:"MARE-14",   cat:"mare", nombre:"Soosan SB43E-TOP", clase:"Retroexcavadora" },
  { codigo:"MARE-15",   cat:"mare", nombre:"Soosan SB43E-TOP", clase:"Retroexcavadora" },
  { codigo:"MARE-16",   cat:"mare", nombre:"Soosan SB-43",     clase:"Retroexcavadora" },
  { codigo:"MARE-17",   cat:"mare", nombre:"Soosan SB20TS-P",  clase:"Miniexcavadora 3–6 t" },
  { codigo:"MARE-18-2", cat:"mare", nombre:"Soosan SB-43TS-P", clase:"Retroexcavadora" },
  { codigo:"MARE-19",   cat:"mare", nombre:"Soosan SB-43TS-P", clase:"Retroexcavadora" },
  { codigo:"MARE-20",   cat:"mare", nombre:"Soosan SB20TS-P",  clase:"Miniexcavadora 3–6 t" },
  { codigo:"MARE-21",   cat:"mare", nombre:"Soosan SB43E-TOP", clase:"Retroexcavadora" },
  { codigo:"MARE-22",   cat:"mare", nombre:"Soosan SB43E-TOP", clase:"Retroexcavadora" },

  // BARREDORAS — minicargadores
  { codigo:"BARR-01", cat:"barredora", nombre:"Caterpillar", clase:"Minicargador" },
  { codigo:"BARR-02", cat:"barredora", nombre:"Edge",        clase:"Minicargador" },
  { codigo:"BARR-03", cat:"barredora", nombre:"Edge",        clase:"Minicargador" },
  { codigo:"BARR-04", cat:"barredora", nombre:"Edge",        clase:"Minicargador" },

  // FORROS DE PIÑA — compactadoras
  { codigo:"FOR-01", cat:"forro", nombre:"Volvo (2)",   clase:"Compactadora" },
  { codigo:"FOR-02", cat:"forro", nombre:"Bomag (3)",   clase:"Compactadora" },
  { codigo:"FOR-03", cat:"forro", nombre:"CAT (2)",     clase:"Compactadora" },
  { codigo:"FOR-04", cat:"forro", nombre:"CAT (2)",     clase:"Compactadora" },
  { codigo:"FOR-05", cat:"forro", nombre:"Dynapac (3)", clase:"Compactadora" },
  { codigo:"FOR-06", cat:"forro", nombre:"Dynapac (3)", clase:"Compactadora" },
  { codigo:"FOR-08", cat:"forro", nombre:"Bomag (3)",   clase:"Compactadora" },
  { codigo:"FOR-09", cat:"forro", nombre:"CAT (2)",     clase:"Compactadora" },
  { codigo:"FOR-10", cat:"forro", nombre:"Hamm (2)",    clase:"Compactadora" },
  { codigo:"FOR-11", cat:"forro", nombre:"Hamm (2)",    clase:"Compactadora" },
  { codigo:"FOR-12", cat:"forro", nombre:"CAT (2)",     clase:"Compactadora" },
  { codigo:"FOR-13", cat:"forro", nombre:"CAT (2)",     clase:"Compactadora" },
  { codigo:"FOR-14", cat:"forro", nombre:"CAT (2)",     clase:"Compactadora" },

  // BALDES — genéricos, capacidad según familia / tonelaje
  { codigo:"Balde excavadora 26–36 t",         cat:"balde", nombre:"≈1.6–1.9 m³", clase:"DX360, 360LCA" },
  { codigo:"Balde excavadora 20–22 t",         cat:"balde", nombre:"≈1.0–1.2 m³", clase:"CAT 320, DX225, HX220" },
  { codigo:"Balde excavadora 13–14 t",         cat:"balde", nombre:"≈0.5–0.6 m³", clase:"CAT 313GC, DX140" },
  { codigo:"Balde miniexcavadora",             cat:"balde", nombre:"≈0.10–0.20 m³", clase:"Minis 3–6 t" },
  { codigo:"Balde retroexcavadora excavación", cat:"balde", nombre:"≈0.30 m³",    clase:"CAT 416" },
  { codigo:"Balde retroexcavadora cargador",   cat:"balde", nombre:"≈1.0 m³",     clase:"CAT 416" },
  { codigo:"Balde minicargador",               cat:"balde", nombre:"≈0.4–0.5 m³", clase:"Minicargadores" },

  // ORQUILLAS — genéricas, todas iguales
  { codigo:"Orquilla estándar", cat:"orquilla", nombre:"Universal", clase:"Telehandler / Minicargador" },
];

// ------------------------------------------------------------
//  7. CONFIGURACIÓN GENERAL
// ------------------------------------------------------------
const CONFIG = {
  nombre_empresa:  "Super Mega Máquinas",
  prefijo_ref:     "SMM-MOV",
  responsable_ops: "José Olmedo",
};

// ------------------------------------------------------------
//  8. GALERA SMM — datos fijos (origen/destino por defecto)
// ------------------------------------------------------------
const GALERA = {
  nombre:    "Galera SMM",
  direccion: "Tocumen Warehouse, Galera 12B, Las Mañanitas, Ciudad de Panamá",
};
