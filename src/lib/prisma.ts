import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["query"], // eska karan log query hoo raha hai terminal me server ka 
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 

export default prisma