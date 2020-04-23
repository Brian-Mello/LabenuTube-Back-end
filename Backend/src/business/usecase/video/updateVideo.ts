import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class UpdateVideoUC {
    constructor(
        private videoGateway: VideoGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: UpdateVideoUCInput): Promise<UpdateVideoUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

        if(!userInfo){
            throw new Error("You must be connected!")
        }
        
        const video = await this.videoGateway.getVideoById(input.id);

        if(!video){
            throw new Error("Video not found");
        }

        if(!input.description && !input.title){
            throw new Error("You must send some input!")
        }

        if(!input.title){
            await this.videoGateway.updateVideoDescription(input.id, userInfo.id, input.description)
        } else if(!input.description){
            await this.videoGateway.updateVideoTitle(input.id, userInfo.id, input.title)
        } else {
            if(userInfo.id !== video.getUser_id()){
                throw new Error("You cannot update this video!")
            }

            await this.videoGateway.updateVideo(input.id, userInfo.id, input.title, input.description)
        }

        return {
            message: `Video ${input.title} updated Successfully!`
        }
    }
}

export interface UpdateVideoUCInput {
    token: string;
    id: string;
    title: string;
    description: string;
}

export interface UpdateVideoUCOutput {
    message: string;
}