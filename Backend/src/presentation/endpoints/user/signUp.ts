import { Request, Response } from "express";
import { SignUpUC } from "../../../business/usecase/user/signUp";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { BcryptService } from "../../lambda/services/bcryptServices";
import { RefreshTokenDB } from "../../../data/refreshTokenDataBase";

export const SignUpEndpoint = async (req: Request, res: Response) => {
    try {
        const signUpUC = new SignUpUC(new UserDB(), new JwtAuthorizer(), new BcryptService(), new RefreshTokenDB());

        const name = req.body.name
        const birthdate = req.body.birthdate
        const email = req.body.email
        const password = req.body.password
        const type = req.body.type
        const photo = req.body.photo
        const device = req.body.device

        const newUser = await signUpUC.execute({
            name,
            birthdate,
            email,
            password,
            type,
            photo,
            device
        });

        res.status(200).send(newUser);
    } catch(err){
        res.status(400).send({
            message: err.message
        });
    }
}