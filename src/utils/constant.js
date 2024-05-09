let apiRoot = "";

if (import.meta.env.MODE === "development") {
  apiRoot = "http://localhost:5000";
}
if (import.meta.env.MODE === "production") {
  apiRoot = "https://server-pd-booking.onrender.com";
}

export const API_ROOT = apiRoot;
