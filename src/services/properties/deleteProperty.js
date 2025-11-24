import { PrismaClient } from '../../generated/prisma/client.js'
import { validateProperty } from '../../utils/bookingHelpers.js'
const prisma = new PrismaClient();

const deleteProperty = async ({ id }) => {
    await validateProperty(id);

    const deletedProperty = await prisma.property.delete({
        where: { id }
    })

    return deletedProperty.id
}

export default deleteProperty