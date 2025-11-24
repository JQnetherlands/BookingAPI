import { validateHost } from "../../utils/bookingHelpers.js";

const getHostById = async ({ id }) => {
    const host = await validateHost(id);

    return host;
}

export default getHostById
