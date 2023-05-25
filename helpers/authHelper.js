//this is for encrypt user password before saving into database

import bcrypt from 'bcrypt';
export const hashPassword = async (password) => {
    try {
        const seltRound = 10;
        const hashedPassword = await bcrypt.hash(password, seltRound);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}