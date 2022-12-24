import { Value } from "ts-postgres";

export type Visitor = {
    id: string;
    fullname: string;
    address: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;    
}

export function getVisitorRow(row: Value[]): Visitor {
    if (row.length !== 6) {
        throw new Error(`Invalid row length: ${row.length}`);
    }
    
    const visitor: Visitor = {
        id: row[0] as string,
        fullname: row[1] as string,
        address: row[2] as string,
        createdAt: row[3] as Date,
        createdBy: row[4] as string,
        updatedAt: row[5] as Date || null,
    }

    return visitor;
}
