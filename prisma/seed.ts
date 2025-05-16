import { PrismaClient } from "../generated/prisma";
import { hashPassword } from "../src/utils/hash";

const prisma = new PrismaClient();

async function main() {
  const prodis = ["PGPAUD", "PGSD", "PSTI", "SISTEL", "MKB"];

  // Admin
  await prisma.user.create({
    data: {
      email: "admin@upi.edu",
      name: "Admin",
      password: hashPassword("admin123"), // nanti diganti hash
      role: "ADMIN",
      prodi: "PSTI", // Admin bisa dari prodi manapun
    },
  });

  // Reviewer per prodi
  for (const prodi of prodis) {
    await prisma.user.create({
      data: {
        email: `reviewer.${prodi.toLowerCase()}@upi.edu`,
        name: `Reviewer ${prodi}`,
        password: hashPassword("reviewer123"),
        role: "REVIEWER",
        prodi: prodi as any,
      },
    });
  }

  // User per prodi
  for (const prodi of prodis) {
    await prisma.user.create({
      data: {
        email: `user.${prodi.toLowerCase()}@upi.edu`,
        name: `User ${prodi}`,
        password: hashPassword("user123"),
        role: "USER",
        prodi: prodi as any,
      },
    });
  }
}

main()
  .then(() => {
    console.log("✅ Seed success");
  })
  .catch((e) => {
    console.error("❌ Seed error", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
