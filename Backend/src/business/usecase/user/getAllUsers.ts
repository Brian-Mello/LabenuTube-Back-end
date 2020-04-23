import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class GetAllUserUC{
    constructor(
        private userGateway: UserGateway,
        private authenticationToken: AuthenticationGateway
    ){}

    public async execute(input: GetAllUserUCInput): Promise<GetAllUserUCOutput>{
        const userInfo = await this.authenticationToken.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new Error("User info not found!")
        }

        if(userInfo.type !== "ADMIN"){
            throw new Error("Only admins can use this endpoint")
        }

        const users = await this.userGateway.getAllUsers()

        if(!users){
            throw new Error("Users list are empty!")
        }

        return {
            Users: users.map(user => {
                return {
                    id: user.getId(),
                    name: user.getName(),
                    birthdate: user.getBirthdate(),
                    email: user.getEmail(),
                    type: user.getType(),
                    photo: user.getPhoto()
                }
            })
        }
        
    }
}

export interface GetAllUserUCInput {
    token: string;
}

export interface GetAllUserUCOutput {
    Users: GetAllUserUCOutputUser[]
}

export interface GetAllUserUCOutputUser {
    id: string;
    name: string;
    birthdate: Date;
    email: string;
    type: string;
    photo: string;
}