import { Request, Response } from "express";
import { GetUserDataUC } from "../../../business/usecase/user/getUserData";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { JwtMustBeProvided } from "../../../business/error/JwtMustBeProvided";

export const GetUserDataEndpoint = async (req: Request, res: Response) => {
    try{
        const auth = req.headers.Authorization || req.headers.authorization
        
        if(!auth){
            throw new JwtMustBeProvided()
        }

        const token = auth as string;

        const getUserDataUC = new GetUserDataUC( new UserDB(), new JwtAuthorizer());
        
        const result = await getUserDataUC.execute({
            token
        })

        res.status(200).send(result)
    } catch(err){
        console.log(err)
        res.status(400).send({
            message: err.message
        })
    }
}