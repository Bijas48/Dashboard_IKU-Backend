import rateLimit from "express-rate-limit";

// Rate limit login dan register (10 kali per 10 menit)
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message:
    "Terlalu banyak percobaan dalam waktu yang singkat, silakan coba lagi setelah beberapa saat.",
});
