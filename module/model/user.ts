import { Value } from "ts-postgres";

export type User = {
    id: string;
    fullname: string;
    email: string;
    password: string;
    address: string;
    freeUsageFinanceStatement: number;
    freeUsagePersonalFinance: number;
    freeUsageSavingRate: number;
    role: string | null;
    createdAt: Date;
    createdBy: string | null;
    updatedAt: Date | null;
    updatedBy: string | null;
    deletedAt: Date | null;
    isDeleted: boolean | null;
}

export function getUserRow(row: Value[]): User {
    if (row.length !== 14) {
        throw new Error(`Invalid row length: ${row.length}`);
    }
    
    const user: User = {
        id: row[0] as string,
        fullname: row[1] as string,
        email: row[2] as string,
        password: row[3] as string,
        address: row[4] as string,
        freeUsageFinanceStatement: row[5] as number,
        freeUsagePersonalFinance: row[6] as number,
        freeUsageSavingRate: row[7] as number,
        role  : row[14] as string || null,
        createdAt: row[8] as Date,
        createdBy: row[9] as string || null,
        updatedAt: row[10] as Date || null,
        updatedBy: row[11] as string || null,
        deletedAt: row[12] as Date || null,
        isDeleted: row[13] as boolean || null,
    }

    return user;
}