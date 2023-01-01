import { supabase } from "@/module/config/database";
import { isEmpties } from "@/module/internal/helper/empty";
import { ErrorResponse, newErrorResponse, VisitorResponse } from "@/module/model/api";
import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

export default async function visitorHander(
    req: NextApiRequest,
    res: NextApiResponse<VisitorResponse | ErrorResponse>
) {
    if (req.method === "POST") {
        const {
            fullname,
            address
        } = req.body;

        if(isEmpties(fullname, address)) {
            res.status(400).json(newErrorResponse("400", "Bad request", "Please insert fullname and address parameter"));
        }

        try {
            const visitorId = uuid().replaceAll("-", "");

            const visitor = await supabase.from("visitors").insert([
                {
                    id: visitorId,
                    fullname: fullname,
                    address: address,
                    created_at: new Date(),
                    created_by: "system",
                    updated_at: null,
                }
            ]).single();

            if (visitor.status == 201 && visitor.statusText == 'Created') {
                res.status(201).json({
                    id: visitorId,
                    fullname: fullname,
                    address: address,
                });
            } else {
                throw new Error(visitor.error?.message);
            }

        } catch (err) {
            res.status(500).json(newErrorResponse("500", "internal server error", err.message));
        }
    } else {
        res.status(405).json(newErrorResponse("405", "Method not allowed", "Method not allowed"));
    }
}