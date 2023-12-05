import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.room.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [
            {
                username: 'spongebob',
                fullName: 'SpongeBob SquarePants'
            },
            {
                username: 'patrick',
                fullName: 'Patrick Star'
            }
        ]
    });

    await prisma.room.createMany({
        data: [
            {
                name: 'Free Room',
                description: 'This is a free room',
                content:
                    '<h1>This is a free room</h1><p>Mollit cillum sint duis Lorem consectetur officia sit esse irure eu deserunt laboris. Culpa nulla velit pariatur ex pariatur duis excepteur pariatur officia ad. Incididunt minim velit ut qui excepteur consequat reprehenderit pariatur incididunt sit nostrud adipisicing sunt quis.</p>',
                isSecret: false,
                image: 'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            {
                name: 'Secret Room',
                description: 'This is a secret room',
                content:
                    '<h1>This is a secret room</h1><p>Magna excepteur Lorem eu Lorem quis excepteur eu. Ex consequat enim esse do pariatur reprehenderit deserunt officia veniam. Anim et exercitation nostrud reprehenderit pariatur enim pariatur aliqua. Deserunt magna nulla proident sunt cillum ex eiusmod esse. Ullamco cupidatat excepteur dolore id cillum nostrud aute.</p>',
                isSecret: true,
                image: 'https://images.pexels.com/photos/1726310/pexels-photo-1726310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
        ]
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
