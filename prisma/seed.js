import { PrismaClient } from "../src/generated/prisma/client.js";
import hostData from "../src/data/hosts.json" with { type: 'json' };
import propertyData from "../src/data/properties.json" with { type: 'json' };
import userData from "../src/data/users.json" with { type: 'json' };
import bookingData from "../src/data/bookings.json" with { type: 'json' };
import reviewData from "../src/data/reviews.json" with { type: 'json' };

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function main() {
    const { hosts } = hostData;
    const { properties } = propertyData;
    const { users } = userData;
    const { bookings } = bookingData;
    const { reviews } = reviewData;

    for (const host of hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host
        })
    }

    for (const property of properties) {
        await prisma.property.upsert({
            where: { id: property.id },
            update: {},
            create: property
        })
    }

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        })
    }

    for (const booking of bookings) {
        await prisma.booking.upsert({
            where: { id: booking.id },
            update: {},
            create: booking
        })
    }

    for (const review of reviews) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: review
        })
    }
    
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