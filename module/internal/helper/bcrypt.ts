import bcrypt from 'bcryptjs';

export function hashPassword(userPassword: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}

export function checkPassword(userPassword: string, dbPassword: string): boolean {
    return bcrypt.compareSync(userPassword, dbPassword);
}


