let apiRootServer = "";

if (import.meta.env.MODE === "development") {
  apiRootServer = "http://localhost:5000";
}
if (import.meta.env.MODE === "production") {
  apiRootServer = "https://server-pd-booking.onrender.com";
}

export const API_ROOT = apiRootServer;
