import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    await prisma.user.create({
        data: {
            username: 'igor',
            fullName: 'Igor Wilian Faoro'
        }
    });

    await prisma.secretRoomState.create({
        data: {
            key: 'main-room'
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
