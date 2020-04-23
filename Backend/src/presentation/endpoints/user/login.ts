import { Request, Response } from "express";
import { LoginUC } from "../../../business/usecase/user/login";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { BcryptService } from "../../lambda/services/bcryptServices";
import { RefreshTokenDB } from "../../../data/refreshTokenDataBase";

export const LoginEndpoint = async(req: Request, res: Response) =>{
    try {

        const loginUC = new LoginUC(new UserDB(), new JwtAuthorizer(), new BcryptService(), new RefreshTokenDB());

        const email = req.body.email;
        const password = req.body.password;
        const device = req.body.device;

        const result = await loginUC.execute({
            email,
            password,
            device
        });

        res.status(200).send(result);
    } catch(err) {
        res.status(400).send({
            message: err.message
        });
    }
}