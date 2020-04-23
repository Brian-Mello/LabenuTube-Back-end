import { Request, Response } from "express";
import { GetAllUserVideosUC } from "../../../business/usecase/video/getAllUserVideos";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { JwtMustBeProvided } from "../../../business/error/JwtMustBeProvided";

export const GetAllUserVideosEndpoint = async (req: Request, res: Response) => {
    try{

        const auth = req.headers.Authorization || req.headers.authorization

        if(!auth){
            throw new JwtMustBeProvided()
        }
        
        const token = auth as string;
        const id = req.query ? req.query.id as string : "";

        const getAllUserVideosUC = new GetAllUserVideosUC(new VideoDB, new JwtAuthorizer())
        const result = await getAllUserVideosUC.execute({
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