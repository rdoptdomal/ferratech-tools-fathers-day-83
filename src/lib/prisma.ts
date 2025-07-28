import { PrismaClient } from '@prisma/client';

// Configurar DATABASE_URL se não estiver definido
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority';
  console.log('🔧 DATABASE_URL configurado via fallback');
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Testar conexão na inicialização
prisma.$connect()
  .then(() => {
    console.log('✅ Prisma conectado com sucesso');
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar Prisma:', error);
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 