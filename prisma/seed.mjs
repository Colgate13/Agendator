/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AppointmentStatus = [
  {
    status: 1,
    description: 'scheduled',
  },
  {
    status: 2,
    description: 'finalized',
  },
  {
    status: 3,
    description: 'canceled',
  },
];

async function main() {
  console.log('Start seeding 🌱🌾🌴');
  console.log('Start seeding AppointmentStatus ->');
  for (const appointmentStatus of AppointmentStatus) {
    const UserPermissions = await prisma.appointmentStatus.create({
      data: appointmentStatus,
    });
    console.log(
      `Created AppointmentStatus with status: ${appointmentStatus.status}:${appointmentStatus.description}`,
    );
  }
  console.log('Seeding finished. 🌽🌳🌲');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
