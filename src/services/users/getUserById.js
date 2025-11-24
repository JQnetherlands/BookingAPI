import { validateUser } from "../../utils/bookingHelpers.js";


const getUserById = async ({ id }) => {
    const user = await validateUser(id);

    const { password, ...safeUser } = user;
    return safeUser;
}

export default getUserById