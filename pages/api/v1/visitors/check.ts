import { supabase } from "@/module/config/database";
import { isEmpty } from "@/module/internal/helper/empty";
import { ErrorResponse, newErrorResponse, VisitorResponse } from "@/module/model/api";
import { NextApiRequest, NextApiResponse } from "next";


export default async function checkVisitorHandler(
    req: NextApiRequest,
    res: NextApiResponse<VisitorResponse | ErrorResponse>
) {
    if(req.method === "POST") {
        const {
            id
        } = req.body;

        if(!id) {
            res.status(400).json(newErrorResponse("400", "Bad request", "Please insert id parameter"));
        }

        try {
            const visitor = await supabase.from("visitors").select("*").eq("id", id).single();
            if (isEmpty(visitor.data)) {
                res.status(404).json(newErrorResponse("404", "Not found", "Visitor not found"));
            }

            res.status(200).json({
                id: visitor.data.id,
                fullname: visitor.data.fullname,
                address: visitor.data.address,
            });

        } catch (error) {
            res.status(500).json(newErrorResponse("500", "internal server error", error.message));
        }
    } else {
        res.status(405).json(newErrorResponse("405", "Method not allowed", "Method not allowed"));
    }
}