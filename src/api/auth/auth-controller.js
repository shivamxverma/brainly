import {handleEmaiPasswordRegister, handleEmailPasswordLogin} from './auth-helper.js';
import {cookieOptions} from './auth-service.js';

export async function EmailPasswordRegister(req, res) {
    try {
        const response = await handleEmaiPasswordRegister(req.body);

        return res.status(201).json({
            message : "User Successfully Registered",
            success : true,
            data : response
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Registration failed",
            success: false
        });
    }
}

export async function EmailPasswordLogin(req, res) {
    try {
        const response = await handleEmailPasswordLogin(req.body);

        res.cookie('accessToken', response.accessToken, cookieOptions());
        res.cookie('refreshToken', response.refreshToken, cookieOptions());
        
        return res.status(200).json({
            message : "User Successfully Logged In",
            success : true,
            data : response
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Login failed",
            success: false
        });
    }
}