import jwt from 'jsonwebtoken';
export const generateToken = (data,expiresIn = '1d')=> {
    return jwt.sign(
        data,
        process.env.JWT_SECRET ?? 'core@2023',
        {expiresIn:expiresIn}

    )
}

export const decodeToken = (token)=> {
    try {
        return jwt.verify(token, process.env.JWT_SECRET ?? 'core@2023');
    } catch (err) {
        return null;
    }
}