import { validateProperty } from "../../utils/bookingHelpers.js";


const getPropertyById = async ({ id }) => {
    const property = await validateProperty(id);

    return property
}

export default getPropertyById