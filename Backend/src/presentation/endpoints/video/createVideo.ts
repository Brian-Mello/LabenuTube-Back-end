import { Request, Response } from "express";
import { CreateVideoUC } from "../../../business/usecase/video/createVideo";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { JwtMustBeProvided } from "../../../business/error/JwtMustBeProvided";

export const CreateVideoEndpoint = async (req: Request, res: Response) =>{
    try{
        
        const auth = req.headers.Authorization || req.headers.authorization

        if(!auth){
            throw new JwtMustBeProvided()
        }
        
        const link = req.body.link;
        const title = req.body.title;
        const description = req.body.description;
        const photo = req.body.photo;
        const token = auth as string;
        
        const createVideoUC = new CreateVideoUC(new VideoDB(), new JwtAuthorizer());
        const result = await createVideoUC.execute({
            title, 
            link,
            description,
            photo, 
            token
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}