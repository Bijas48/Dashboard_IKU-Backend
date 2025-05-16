import { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma";

export const checkRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        error:
          "Akses ditolak: otoritas Anda tidak cukup untuk melakukan tindakan ini.",
      });
    }
    next();
  };
};
