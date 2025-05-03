// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // prevent multiple instances in development
  // so you reuse the same client across hot reloads
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    // you can pass log levels here if you like…
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// import { PrismaClient } from "@prisma/client/extension";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
