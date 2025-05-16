import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  prodi: z.enum(["PGPAUD", "PGSD", "PSTI", "SISTEL", "MKB"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
