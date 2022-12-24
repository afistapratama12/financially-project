import { NextApiRequest, NextApiResponse } from "next";
import { isEmpties } from "../../../module/internal/helper/empty";
import { ErrorResponse, newErrorResponse, newRegisterLoginResponse, RegisterLoginResponse } from "../../../module/model/api";
import { Register } from "../../../module/service/user";

export default async function registerHandler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterLoginResponse | ErrorResponse>
) {
    if(req.method === "POST") {
        const {
            fullname,
            email,
            password,
            address
        } = req.body

        if(isEmpties(fullname, email, password, address)) {
            res.status(400).json(newErrorResponse("ERR-400", "Bad Request", "Semua field harus diisi"))
        }

        try {
            const result = await Register({
                fullname,
                email,
                password,
                address
            })

            if(result instanceof Error) {
                res.status(400).json(newErrorResponse("ERR-400", "Bad Request", result.message))
            }

            if (typeof result === "string") {
                res.status(200).json(newRegisterLoginResponse("user register successfully", result))
            }
            
        } catch (error) {
            console.log("err msg:", error.message)
            console.log("err name:", error.name)
        
            res.status(500).json(newErrorResponse("ERR-500", "Internal Server Error", error.message))
        }

    } else {
        res.status(405).json(newErrorResponse("ERR-405", "Method Not Allowed", "Method tidak diijinkan"))
    }
}