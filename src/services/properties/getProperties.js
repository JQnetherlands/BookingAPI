import prisma from "../../lib/prisma.js";
import NotFoundError from "../../errors/NotFoundError.js";


const getProperties = async ({ location, pricePerNight }) => {
    const where = {};

    if (location) {
        where.location = location;
    }

    if (pricePerNight) {
        where.pricePerNight = Number(pricePerNight)
    }

    const properties = await prisma.property.findMany({
        where,
    })

    if (properties.length === 0 && (location || pricePerNight)) {
        let identifier;

        if (location && pricePerNight) {
            identifier = `location: ${location} and price: ${pricePerNight}`
        } else {
            identifier = location || pricePerNight;
        }

        throw new NotFoundError("property", identifier)
    }
    
    return properties;
}

export default getProperties;