import {User} from "../../db/schema.js";
import bcrypt from "bcryptjs";
import { returnTokens } from "./auth-service.js";

export async function handleEmaiPasswordRegister(userData) {
    const users = await User.findOne({ email : userData.email});
    if(users) {
        throw new Error("User with this Email already Exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);

    const createUser = await User.create({
        fullName : userData.fullName,
        email : userData.email,
        password : hashPassword
    })

    if(!createUser){
        throw new Error("Error creating New User");
    }
    return createUser;
}

export async function handleEmailPasswordLogin(userData) {

    const users = await User.findOne({ email : userData.email});

    if(!users) {
        throw new Error("User with this Email not Exist");
    }

    const compare = await bcrypt.compare(userData.password, users.password); // true

    if(!compare) {
        throw new Error("Password is not matched");
    }

    const payload = {
        _id : users._id,
        email : users.email,
    }

    const { accessToken , refreshToken} = await returnTokens(payload);

    return {
        accessToken,
        refreshToken
    }
}