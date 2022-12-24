import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, newErrorResponse, newRegisterLoginResponse, RegisterLoginResponse } from "../../../module/model/api";
import { Login } from "../../../module/service/user";

export default async function loginHandler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterLoginResponse | ErrorResponse>
) {
    if(req.method === "POST") {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).json(newErrorResponse("ERR-400", "Bad Request", "Email dan password harus diisi"))
        }

        try {
            const result = await Login({ email, password });
            
            if(result instanceof Error) {
                res.status(400).json(newErrorResponse("ERR-400", "Bad Request", result.message))
            }

            if (typeof result === "string") {
                res.status(200).json(newRegisterLoginResponse("user login successfully", result))
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