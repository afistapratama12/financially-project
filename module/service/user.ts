import { client } from "../config/database";
import { checkPassword, hashPassword } from "../internal/helper/bcrypt";
import { generateToken } from "../internal/helper/jwt";
import { LoginRequest, RegisterRequest } from "../model/api";
import { getUserRow } from "../model/user";
import { Query } from "ts-postgres";
import { randomUUID } from "crypto";

export const Login = async (reqData: LoginRequest) => {
    try {
        await client.connect();

        const result = await client.query(
            `SELECT * FROM users WHERE email = $1 AND is_deleted = $2`,
            [reqData.email, false]
        );

        if (result.rows.length === 0) {
            throw new Error("User not found");
        }

        const user = getUserRow(result.rows[0]);

        if(!checkPassword(reqData.password, user.password)) {
            throw new Error("Invalid password");
        }

        return generateToken({
            id: user.id,
            role: user.role,
        })
    } catch (error) {
        return error;
    } finally {
        await client.end();
    }
}

export const Register = async (reqData: RegisterRequest) => {
    try {
        await client.connect()
        
        const query = await client.query(
            `SELECT * FROM users WHERE email = $1 AND is_deleted = $2`,
            [reqData.email, false]
        )

        if (query.rows.length > 0) {
            throw new Error("Email already registered")
        }

        const queryInsert = new Query(
            `INSERT INTO users (id, full_name, email, password, address, role, free_usage_finance_statement, free_usage_personal_finance, free_usage_saving_rate, created_at, created_by, updated_at, updated_by, deleted_at, is_deleted)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`,
            [randomUUID().replace("-", ""), reqData.fullname, reqData.email, hashPassword(reqData.password), reqData.address, "user", 2, 2, 10, new Date(), null, null, null, null, false]
        )

        const result = await client.execute(queryInsert)
        if (result.names[0] === "id") {
            return generateToken({
                id: result.rows[0][0],
                role: "user",
            })
        } else {
            throw new Error("Failed insert to database")
        }
    } catch (error) {
        return error
    } finally {
        await client.end()
    }
}