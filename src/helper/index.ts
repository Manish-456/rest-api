import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString('hex');

export const authentication = (salt : string, password : string) => {
    return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(process.env.SECRET_KEY)
    .digest('base64');
}