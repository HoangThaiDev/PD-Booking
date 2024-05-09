let apiRoot = "";
console.log(import.meta.env);
if (import.meta.env.DEV === true) {
  apiRoot = "http://localhost:5000";
}
if (import.meta.env.PRODUCTION === true) {
  apiRoot = "https://server-pd-booking.onrender.com";
}

export const API_ROOT = apiRoot;
