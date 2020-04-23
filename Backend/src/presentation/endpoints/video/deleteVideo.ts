import { Request, Response } from "express";
import { DeleteVideoUC } from "../../../business/usecase/video/deleteVideo";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { JwtMustBeProvided } from "../../../business/error/JwtMustBeProvided";

export const DeleteVideoEndpoint = async (req: Request, res: Response) => {
    try {

        const auth = req.headers.Authorization || req.headers.authorization

        if(!auth){
            throw new JwtMustBeProvided()
        }

        const token = auth as string;
        const id = req.params.id;
        
        const deleteVideoUC = new DeleteVideoUC(new VideoDB(), new JwtAuthorizer());
        const result = await deleteVideoUC.execute({
            token,
            id
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}