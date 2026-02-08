import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const prismaClientSingleton = () => {
  // Use DATABASE_URL (pooler) for production, DIRECT_DATABASE_URL for dev
  const connectionString = process.env.DATABASE_URL || process.env.DIRECT_DATABASE_URL!
  const pool = new Pool({ 
    connectionString,
    // Serverless-optimized settings
    max: 1, // Limit connections in serverless
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
