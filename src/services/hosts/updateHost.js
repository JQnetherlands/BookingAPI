import { PrismaClient } from "../../generated/prisma/client.js";
import { validateHost } from "../../utils/bookingHelpers.js";
import { validateEmail, validatePhone, validateString } from "../../utils/validate.js";

const prisma = new PrismaClient();

const updateHost = async ({ id, username, password, name, email, phoneNumber, pictureUrl, aboutMe}) => {
    await validateHost(id);

    const data = {};
    if (username !== undefined) { 
        validateString({username}, ["username"]);
        data.username = username
    } 
    
    if (password !== undefined) {
        validateString({password}, ["password"]);
        data.password = password;
    } 

    if (name !== undefined) {
        validateString({name}, ["name"]);
        data.name = name;
    } 

    if (email !== undefined) {
        validateEmail(email);
        data.email = email
    } 
    
    if (phoneNumber !== undefined) {
        validatePhone(phoneNumber)
        data.phoneNumber = phoneNumber;
    } 

    if (pictureUrl !== undefined) {
        validateString({pictureUrl}, ["pictureUrl"]);
        data.pictureUrl = pictureUrl;
    } 

    if (aboutMe !== undefined) {
        validateString({aboutMe}, ["aboutMe"]);
        data.aboutMe = aboutMe;
    } 

    const updatedHost = await prisma.host.update({
        where: { id },
        data,
    })

    return updatedHost
}

export default updateHost