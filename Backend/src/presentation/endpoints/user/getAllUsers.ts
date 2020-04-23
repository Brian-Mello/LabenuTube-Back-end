import { Request, Response } from "express";
import { GetAllUserUC } from "../../../business/usecase/user/getAllUsers";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { JwtMustBeProvided } from "../../../business/error/JwtMustBeProvided";

export const GetAllUsersEndpoint = async (req: Request, res: Response) => {
    try{

        const auth = req.headers.Authorization || req.headers.authorization

        if(!auth){
            throw new JwtMustBeProvided()
        }

        const token = auth as string

        const getAllUsersUC = new GetAllUserUC(new UserDB(), new JwtAuthorizer())

        const result = await getAllUsersUC.execute({
            token
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}