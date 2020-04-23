import { Request, Response } from "express";
import { UpdateVideoUC } from "../../../business/usecase/video/updateVideo";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { JwtMustBeProvided } from "../../../business/error/JwtMustBeProvided";

export const UpdateVideoEndpoint = async (req: Request, res: Response) => {
    try {   

        const auth = req.headers.Authorization || req.headers.authorization

        if(!auth){
            throw new JwtMustBeProvided()
        }
        
        const token = auth as string;
        const id = req.params.id;
        const title = req.body ? req.body.title : "";
        const description = req.body ? req.body.description : "";

        const updateVideoUC = new UpdateVideoUC(new VideoDB(), new JwtAuthorizer());
        const result = await updateVideoUC.execute({
            token,
            id,
            title,
            description
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}