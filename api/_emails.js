// ============================================================
//  CORREOS DEL SISTEMA SMM — ÚNICO LUGAR PARA EDITAR
//  Cuando alguien entre o salga del equipo, edita SOLO este archivo.
//  Lo usan: send-email.js, aprobar.js, rechazar.js
// ============================================================

// 1) GERENTES — reciben el correo con botones Aprobar / Rechazar
export const EMAILS_GERENTES = [
  "ek@smm.com.pa",            // Ernesto Kochman
  "tony_parra@smm.com.pa",    // Tony Parra
];

// 2) LISTA DE ALERTA — reciben las notificaciones cuando algo se APRUEBA
//    (y las solicitudes que NO requieren aprobación, como desmovilizaciones)
export const EMAILS_ALERTA = [
  "jose.olmedo@smm.com.pa",      // José Olmedo
  "ana.gonzalez@smm.com.pa",     // Ana Gonzalez
  "jhonabet.pitty@smm.com.pa",   // Jhonabet Pitty
  "gerardo.gomez@smm.com.pa",    // Gerardo Gomez
  "vanesa.patino@smm.com.pa",    // Vanesa Patiño
  "ek@smm.com.pa",               // Ernesto Kochman
  "tomas.aguilar@smm.com.pa",    // Tomas Aguilar
  "tony_parra@smm.com.pa",       // Tony Parra
  "emir.quiros@smm.com.pa",      // Emir Quiros
];

// 3) VENDEDOR → CORREO — para avisar al solicitante si su solicitud es RECHAZADA.
//    La clave debe coincidir EXACTAMENTE con el nombre en el formulario.
export const VENDEDOR_EMAIL = {
  "Vanesa Patiño":   "vanesa.patino@smm.com.pa",
  "Ernesto Kochman": "ek@smm.com.pa",
  "Tomas Aguilar":   "tomas.aguilar@smm.com.pa",
  "Tony Parra":      "tony_parra@smm.com.pa",
  "Emir Quiros":     "emir.quiros@smm.com.pa",
};

// Correo de respaldo si no se encuentra el vendedor en el mapa
export const DEFAULT_EMAIL = "emir.quiros@smm.com.pa";
