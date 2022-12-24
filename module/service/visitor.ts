import { randomUUID } from "crypto";
import { Query } from "ts-postgres";
import { uuid } from "uuidv4";
import { client } from "../config/database";
import { VisitorCheckRequest, VisitorNewRequest } from "../model/api";
import { getVisitorRow } from "../model/visitor";


export const checkVisitor = async (reqData: VisitorCheckRequest) => {
    try {
        await client.connect();

        const result = await client.query(
            `SELECT * FROM visitors WHERE id = $1`,
            [reqData.id, false]
        );

        if (result.rows.length === 0) {
            throw new Error("Visitor not found");
        }

        const visitor = getVisitorRow(result.rows[0]);

        return {
            id: visitor.id,
            fullname: visitor.fullname,
            address: visitor.address,
        }
    } catch (error) {
        return error;
    } finally {
        await client.end();
    }
}

export const createVisitor = async (reqData: VisitorNewRequest) => {
    try {
        await client.connect()

        const queryInsert = new Query(
            `INSERT INTO visitors (id, fullname, address, created_at, created_by, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [uuid().replaceAll("-", ""), reqData.fullname, reqData.address, new Date(), "system", null]
        )

        const result = await client.execute(queryInsert)

        if (result.names[0] === "id") {
            return {
                id: result.rows[0][0],
                fullname: reqData.fullname,
                address: reqData.address,
            }
        } else {
            throw new Error("Error insert database to table visitors");
        }
    } catch (error) {
        return error;
    } finally {
        await client.end();
    }
}