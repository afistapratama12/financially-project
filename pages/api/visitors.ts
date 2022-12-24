import { NextApiRequest, NextApiResponse } from "next";
import { isEmpties } from "../../module/internal/helper/empty";
import { ErrorResponse, newErrorResponse, RegisterLoginResponse, VisitorResponse } from "../../module/model/api";
import { checkVisitor, createVisitor } from "../../module/service/visitor";

export default async function visitonHandler(
    req: NextApiRequest,
    res: NextApiResponse<VisitorResponse | ErrorResponse>
){
    if(req.method === "GET") {
        const {
            id
        } = req.body;

        if(!id) {
            res.status(400).json(newErrorResponse("400", "Bad request", "Please insert id parameter"));
        }

        const visitor = await checkVisitor({ id })

        if(visitor instanceof Error) {
            res.status(400).json(newErrorResponse("400", visitor.message, visitor.message));
        }

        res.status(200).json(visitor);
    } else if(req.method === "POST") {
        const {
            fullname,
            address
        } = req.body;

        if(isEmpties(fullname, address)) {
            res.status(400).json(newErrorResponse("400", "Bad request", "Please insert fullname and address parameter"));
        }

        const visitor = await createVisitor({ fullname, address });

        if(visitor instanceof Error) {
            res.status(400).json(newErrorResponse("400", visitor.message, visitor.message));
        }

        res.status(200).json(visitor);
    } else {
        res.status(405).json(newErrorResponse("405", "Method not allowed", "Method not allowed"));
    }
}