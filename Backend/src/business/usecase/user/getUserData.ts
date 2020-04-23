import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class GetUserDataUC {
    constructor(
        private userGateWay: UserGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: GetUserDataUCInput): Promise<GetUserDataUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new Error("User not found");
        }

        const user = await this.userGateWay.getUserById(userInfo.id)

        if(!user){
            throw new Error("User not found!")
        }

        return {
            User: {
                id: user.getId(),
                name: user.getName(),
                birthDate: user.getBirthdate(),
                type: user.getType(),
                email: user.getEmail(),
                password: user.getPassword(),
                photo: user.getPhoto()
            }
            
        }
    }
}

export interface GetUserDataUCInput {
    token: string;
}

export interface GetUserDataUCOutput{
    User: GetUserDataUCOutputUser
}

export interface GetUserDataUCOutputUser{
    id: string;
    name: string;
    birthDate: Date;
    email: string;
    password: string;
    type: string;
    photo: string;
}