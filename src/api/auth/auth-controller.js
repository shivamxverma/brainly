import {handleEmaiPasswordRegister, handleEmailPasswordLogin} from './auth-helper.js';
import {options} from './auth-service.js';

export function EmailPasswordRegister(req,res) {
    const response = handleEmaiPasswordRegister(req.body);

    return res.status(200).json({
        message : "User Successfully Registered",
        success : true,
        data : response
    })
}

export function EmailPasswordLogin(req, res) {
    const response = handleEmailPasswordLogin(req.body);

    res.cookie(response.accessToken, 'accessToken', options());
    res.cookie(response.refreshToken, 'refreshToken', options());
    return res.status(200).json({
        message : "User Successfully Logged In",
        success : true,
        data : response
    })
}