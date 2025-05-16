import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid")
    .refine((email) => email.endsWith("@upi.edu"), {
      message:
        "Hanya email dengan domain @upi.edu yang diperbolehkan untuk mendaftar",
    }),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
  name: z.string().min(3, "Nama harus minimal 3 karakter"),
  prodi: z.enum(["PGPAUD", "PGSD", "PSTI", "SISTEL", "MKB"]),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid")
    .refine((email) => email.endsWith("@upi.edu"), {
      message: "Hanya email dengan domain @upi.edu yang diperbolehkan",
    }),
  password: z.string().min(6),
});
