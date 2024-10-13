import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const aliceHashedPassword = await bcrypt.hash('alice', 10);
  const bobHashedPassword = await bcrypt.hash('bob', 10);
  const alice = await prisma.user.upsert({
    where: { phone: '9999999999' },
    update: {},
    create: {
      phone: '9999999999',
      password: aliceHashedPassword,
      name: 'alice',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { phone: '9999999998' },
    update: {},
    create: {
      phone: '9999999998',
      password: bobHashedPassword,
      name: 'bob',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })