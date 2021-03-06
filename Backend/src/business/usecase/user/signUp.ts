import { UserType, User } from "../../entites/user";
import { v4 } from 'uuid';
import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import { InvalidParameterError } from "../../error/InvalidParams";

export class SignUpUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway,
        private cryptographyGateway: CryptographyGateway,
        private refreshTokenGateway: RefreshTokenGateway
    ){}

    public async execute(input: SignUpUCInput): Promise<SignUpUCOutput>{
        const user = await this.userGateway.login(input.email);

        if(user){
            throw new Error("This email has already been registered!")
        }
        
        const id = v4()

        let type = UserType.USER

        if (input.type === "ADMIN" ){
            type = UserType.ADMIN;
        } else if (input.type !== "USER"){
            throw new InvalidParameterError("Invalid type");
        }

        if(input.password.length < 6){
            throw new Error("Minimum password length is 6");

        } else if (input.email.indexOf("@") === -1){
            throw new InvalidParameterError("Invalid Email");
        } else {

            const hashPassword = await this.cryptographyGateway.encrypt(input.password)

            const user = new User(
                id, 
                input.name,
                input.birthdate,
                input.email,
                hashPassword,
                type,
                input.photo
            )

            await this.userGateway.signUp(user)

            const accessToken = this.authenticationGateway.generateToken({
                id: user.getId(),
                type: user.getType()
            }, process.env.ACCESS_TOKEN_TIME as string);

            const refreshToken = this.authenticationGateway.generateToken({
                id: user.getId(),
                userDevice: input.device
            }, process.env.REFRESH_TOKEN_TIME as string);

            await this.refreshTokenGateway.createRefreshToken({
                token: refreshToken,
                user_id: user.getId(),
                device: input.device
            })

            return {
                message: "User Created Succefully",
                accessToken: accessToken,
                refreshToken:  refreshToken
            }
        }
    }
}

export interface SignUpUCInput{
    name: string;
    birthdate: Date;
    email: string;
    password: string;
    type: UserType;
    photo: string;
    device: string;
}

export interface SignUpUCOutput{
    message: string;
    accessToken: string;
    refreshToken: string;
}