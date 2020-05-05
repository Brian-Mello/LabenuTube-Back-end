import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import { InvalidParameterError } from "../../error/InvalidParams";

export class LoginUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway,
        private cryptographyGateway: CryptographyGateway,
        private refreshTokenGateway: RefreshTokenGateway
    ){}

    public async execute(input: LoginUCInput): Promise<LoginUCOutput>{
        if(input.email.indexOf("@") === -1 || input.password.length <6 || !input.email || !input.password){
            throw new InvalidParameterError("Invalid password or email!");
        };
        console.log('input: ', input);

        const user = await this.userGateway.login(input.email);
        console.log('user: ', user);
        if(!user){
            throw new Error("User not Found!");
        };

        const compare = await this.cryptographyGateway.compare(input.password, user.getPassword());
        console.log('compare: ', compare);
        if(!compare){
            throw new InvalidParameterError("Invalid password or email!");
        };

        const accessToken = this.authenticationGateway.generateToken({
            id: user.getId(),
            type: user.getType()
        }, process.env.ACCESS_TOKEN_TIME as string)
        console.log('accessToken: ', accessToken);
        const refreshToken = this.authenticationGateway.generateToken({
            id: user.getId(),
            userDevice: input.device
        }, process.env.REFRESH_TOKEN_TIME as string)
        console.log('refreshToken: ', refreshToken);
        const refreshTokenForUserAndDevice = await this.refreshTokenGateway.getRefreshToken(
            input.device,
            user.getId()
        )
        console.log('refreshTokenForUserAndDevice: ', refreshTokenForUserAndDevice);
        if(refreshTokenForUserAndDevice){
            await this.refreshTokenGateway.deleteRefreshToken(input.device, user.getId())
        }

        await this.refreshTokenGateway.createRefreshToken({
            token: refreshToken,
            user_id: user.getId(),
            device: input.device
        })

        return {
            message: "User Logged Succefully",
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
}

export interface LoginUCInput{
    email: string;
    password: string;
    device: string;
}

export interface LoginUCOutput{
    message: string;
    accessToken: string;
    refreshToken: string;
}