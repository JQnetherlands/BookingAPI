import prisma from '../../lib/prisma.js';
import { validateProperty } from '../../utils/bookingHelpers.js'

const deleteProperty = async ({ id }) => {
    await validateProperty(id);

    const deletedProperty = await prisma.property.delete({
        where: { id }
    })

    return deletedProperty.id
}

export default deleteProperty