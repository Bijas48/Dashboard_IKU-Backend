import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import { registerSchema, loginSchema } from "../../validations/auth.schema";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

const prisma = new PrismaClient();

const isValidEmailDomain = (email: string): boolean => {
  return email.endsWith("@upi.edu");
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);

    if (!isValidEmailDomain(data.email)) {
      res.status(400).json({
        error:
          "Hanya email dengan domain @upi.edu yang diperbolehkan untuk mendaftar",
      });
      return;
    }

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      res.status(400).json({
        error:
          "Email sudah digunakan. Silakan gunakan email lain yang belum terdaftar.",
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashPassword(data.password),
        role: "USER",
      },
    });

    const token = generateToken({
      id: user.id,
      role: user.role,
      prodi: user.prodi,
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        prodi: user.prodi,
      },
    });
  } catch (err: any) {
    res.status(400).json({ error: `Terjadi kesalahan: ${err.message}` });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    if (!isValidEmailDomain(data.email)) {
      res.status(400).json({
        error: "Hanya email dengan domain @upi.edu yang diperbolehkan",
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user || !comparePassword(data.password, user.password)) {
      res.status(401).json({
        error:
          "Kredensial tidak valid. Pastikan email dan password yang Anda masukkan benar.",
      });
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      prodi: user.prodi,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        prodi: user.prodi,
      },
    });
  } catch (err: any) {
    res.status(400).json({ error: `Terjadi kesalahan: ${err.message}` });
  }
};
