import { PrismaClient } from '@prisma/client';

// Configurar variável de ambiente se não estiver definida
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 