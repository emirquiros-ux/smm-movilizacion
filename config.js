// ============================================================
//  SMM — ARCHIVO DE CONFIGURACIÓN
//  Edita este archivo para actualizar equipos, vendedores,
//  accesorios y correos. No necesitas tocar index.html.
// ============================================================


// ------------------------------------------------------------
//  1. VENDEDORES / SOLICITANTES
//     Agrega o elimina nombres según el equipo actual.
// ------------------------------------------------------------
const VENDEDORES = [
  "Vanesa Patiño",
  "Ernesto Kochman",
  "Tomas Aguilar",
  "Emir Quiros",
  "Tony Parra",
  "Gerardo Gomez",
];


// ------------------------------------------------------------
//  2. DESTINATARIOS DE ALERTAS POR EMAIL
//     Todos reciben el correo cuando se envía una solicitud.
// ------------------------------------------------------------
const EMAILS_ALERTA = [
  "ek@smm.com.pa",              // Ernesto Kochman
  "jose.olmedo@smm.com.pa",     // José Olmedo (ejecuta movimientos)
  "vanesa.patino@smm.com.pa",   // Vanesa Patiño
  "tomas.aguilar@smm.com.pa",   // Tomas Aguilar
  "tony_parra@smm.com.pa",      // Tony Parra
  "gerardo.gomez@smm.com.pa",   // Gerardo Gomez
  "ana.gonzalez@smm.com.pa",    // Ana Gonzalez
  "emir.quiros@infratec.com.pa",// Emir Quiros
];

// WhatsApp — solo José Olmedo (número con código de país, sin +)
const WHATSAPP_JOSE = "50760000000"; // ← cambia por el número real


// ------------------------------------------------------------
//  3. EQUIPOS
//     Cada equipo tiene: código, tipo, y descripción.
//     El "tipo" determina qué accesorios aplican (ver sección 4).
//
//     TIPOS VÁLIDOS:
//       excavadora | retroexcavadora | miniexcavadora
//       minicargador | telehandler | compactadora
//       bulldozer | motoniveladora
// ------------------------------------------------------------
const EQUIPOS = [

  // EXCAVADORAS
  { codigo: "E-01-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-02-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-03-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-04-LR", tipo: "excavadora",      desc: "Excavadora hidráulica brazo largo" },
  { codigo: "E-05-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-06-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-08-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-09-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-10-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-12-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-13-LR", tipo: "excavadora",      desc: "Excavadora hidráulica brazo largo" },
  { codigo: "E-14-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-15-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-16-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-17-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-18-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-19-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-20-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-21-2",  tipo: "excavadora",      desc: "Excavadora hidráulica brazo largo" },
  { codigo: "E-22-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-23",    tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-24",    tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-25-2",  tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-26",    tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-27",    tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-28",    tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "E-29",    tipo: "excavadora",      desc: "Excavadora hidráulica" },
  { codigo: "ER-02",   tipo: "excavadora",      desc: "Excavadora hidráulica sobre ruedas" },
  { codigo: "ER-03-2", tipo: "excavadora",      desc: "Excavadora hidráulica sobre ruedas" },

  // RETROEXCAVADORAS
  { codigo: "R-02-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-03-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-04-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-05-3",  tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-06-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-07-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-08-3",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-09-2",  tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-09-3",  tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-11-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-14-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-15-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-17-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-18-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-19-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-20-2",  tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-21-2",  tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-22-2",  tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-23",    tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-24",    tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-25",    tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-26",    tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-27",    tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },
  { codigo: "R-28",    tipo: "retroexcavadora", desc: "Retroexcavadora con kit de martillo" },
  { codigo: "R-29",    tipo: "retroexcavadora", desc: "Retroexcavadora sin kit de martillo" },

  // MINIEXCAVADORAS
  { codigo: "ME-01",   tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-02-2", tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-03",   tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-05-2", tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-06",   tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-07-2", tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-08",   tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-10-2", tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-11",   tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-12",   tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },
  { codigo: "ME-13",   tipo: "miniexcavadora",  desc: "Miniexcavadora hidráulica" },

  // MINICARGADORES
  { codigo: "M-01-3",  tipo: "minicargador",    desc: "Minicargador" },
  { codigo: "M-03-3",  tipo: "minicargador",    desc: "Minicargador" },
  { codigo: "M-04-2",  tipo: "minicargador",    desc: "Minicargador" },
  { codigo: "M-05-2",  tipo: "minicargador",    desc: "Minicargador" },

  // TELEHANDLERS
  { codigo: "TH-02",   tipo: "telehandler",     desc: "Telehandler" },
  { codigo: "TH-03",   tipo: "telehandler",     desc: "Telehandler" },

  // COMPACTADORAS / ROLAS
  { codigo: "C-01-3",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-02-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-03-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-04-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-07-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-08-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-09-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-10-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-11",    tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-12-2",  tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-14",    tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-15",    tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "C-16",    tipo: "compactadora",    desc: "Compactadora" },
  { codigo: "CT-01-2", tipo: "compactadora",    desc: "Compactadora 4 ton" },
  { codigo: "CT-06",   tipo: "compactadora",    desc: "Compactadora 4 ton" },
  { codigo: "CT-08",   tipo: "compactadora",    desc: "Compactadora 4 ton" },
  { codigo: "CT-09",   tipo: "compactadora",    desc: "Compactadora 4 ton" },

  // BULLDOZERS
  { codigo: "T-01-2",  tipo: "bulldozer",       desc: "Bulldozer" },
  { codigo: "T-02-3",  tipo: "bulldozer",       desc: "Bulldozer" },
  { codigo: "T-04-2",  tipo: "bulldozer",       desc: "Bulldozer" },
  { codigo: "T-05-2",  tipo: "bulldozer",       desc: "Bulldozer" },
  { codigo: "T-06-2",  tipo: "bulldozer",       desc: "Bulldozer" },
  { codigo: "T-07-2",  tipo: "bulldozer",       desc: "Bulldozer" },
  { codigo: "T-08-2",  tipo: "bulldozer",       desc: "Bulldozer" },
  { codigo: "T-09-2",  tipo: "bulldozer",       desc: "Bulldozer" },

  // MOTONIVELADORAS
  { codigo: "MN-01",   tipo: "motoniveladora",  desc: "Motoniveladora" },
  { codigo: "MN-02",   tipo: "motoniveladora",  desc: "Motoniveladora" },
  { codigo: "MN-03",   tipo: "motoniveladora",  desc: "Motoniveladora" },
  { codigo: "MN-04",   tipo: "motoniveladora",  desc: "Motoniveladora" },
  { codigo: "MN-04-1", tipo: "motoniveladora",  desc: "Motoniveladora" },

];


// ------------------------------------------------------------
//  4. ACCESORIOS POR TIPO DE EQUIPO
//     Define el accesorio por defecto y los opcionales
//     para cada tipo. Si un tipo no aparece aquí, el
//     formulario no mostrará sección de accesorios.
//
//     "codigos" es la lista de accesorios disponibles
//     para ese tipo (se cruza con la sección 5).
// ------------------------------------------------------------
const ACCESORIOS_POR_TIPO = {
  excavadora: {
    default: "Balde",
    opcionales: ["Martillo hidráulico"],
  },
  retroexcavadora: {
    default: "Balde",
    opcionales: ["Martillo hidráulico"],
  },
  miniexcavadora: {
    default: "Balde",
    opcionales: ["Martillo hidráulico"],
  },
  minicargador: {
    default: "Balde",
    opcionales: ["Barredora", "Orquilla"],
  },
  telehandler: {
    default: "Orquilla",
    opcionales: ["Balde"],
  },
  compactadora: {
    default: "Lisa (sin forro)",
    opcionales: ["Forro de piña"],
  },
  // bulldozer y motoniveladora no tienen accesorios — no se listan aquí
};


// ------------------------------------------------------------
//  5. CATÁLOGO DE ACCESORIOS
//     Lista completa de accesorios con código propio.
//     Agrega nuevos accesorios aquí cuando lleguen.
// ------------------------------------------------------------
const ACCESORIOS = [

  // MARTILLOS
  { codigo: "MAEX-01", nombre: "Martillo hidráulico",  tipo: "martillo" },
  { codigo: "MAEX-02", nombre: "Martillo hidráulico",  tipo: "martillo" },
  { codigo: "MAEX-03", nombre: "Martillo hidráulico",  tipo: "martillo" },
  { codigo: "MAEX-04", nombre: "Martillo hidráulico",  tipo: "martillo" },
  { codigo: "MAEX-05", nombre: "Martillo hidráulico",  tipo: "martillo" },

  // BALDES
  { codigo: "BAL-01",  nombre: "Balde estándar",       tipo: "balde" },
  { codigo: "BAL-02",  nombre: "Balde estándar",       tipo: "balde" },
  { codigo: "BAL-03",  nombre: "Balde rocas",          tipo: "balde" },

  // ORQUILLAS
  { codigo: "ORQ-01",  nombre: "Orquilla estándar",    tipo: "orquilla" },
  { codigo: "ORQ-02",  nombre: "Orquilla estándar",    tipo: "orquilla" },

  // BARREDORAS
  { codigo: "BAR-01",  nombre: "Barredora",            tipo: "barredora" },

  // FORROS
  { codigo: "FP-01",   nombre: "Forro de piña",        tipo: "forro" },
  { codigo: "FP-02",   nombre: "Forro de piña",        tipo: "forro" },

];


// ------------------------------------------------------------
//  6. CONFIGURACIÓN GENERAL
// ------------------------------------------------------------
const CONFIG = {
  nombre_empresa:  "Super Mega Máquinas",
  prefijo_ref:     "SMM-MOV",   // prefijo del número de referencia
  responsable_ops: "José Olmedo", // quien ejecuta los movimientos
};


// ============================================================
//  NO EDITAR DEBAJO DE ESTA LÍNEA
// ============================================================
if (typeof module !== 'undefined') {
  module.exports = { VENDEDORES, EMAILS_ALERTA, WHATSAPP_JOSE, EQUIPOS, ACCESORIOS_POR_TIPO, ACCESORIOS, CONFIG };
}
