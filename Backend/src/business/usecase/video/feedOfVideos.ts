import { VideoGateway } from "../../gateways/videoGateway";

export class FeedOfVideosUC {
    constructor(
        private videoGateway: VideoGateway
    ){}

    // private POST_PER_PAGE = 10;

    public async execute(): Promise<FeedOfVideosUCOutput>{

        // let orderBy = "v.creationDate";

        // if(input.orderBy === "v.creationDate" || input.orderBy === "u.name") {
        //     orderBy = input.orderBy;
        // } else if (input.orderBy !== undefined) {
        //     throw new Error("Invalid Order by!")
        // }

        // let orderType = FeedOrderType.ASC;

        // if(input.orderType === "DESC"){
        //     orderType = FeedOrderType.DESC;
        // } else if (input.orderType === "ASC"){
        //     orderType === FeedOrderType.ASC;
        // } else if (input.orderType !== undefined) {
        //     throw new Error("Invalid Order type!")
        // }

        // let page = input.page >= 1 ? input.page : 1;

        // const offset = this.POST_PER_PAGE * (page -1)

        const videos = await this.videoGateway.getVideos()

        if(!videos){
            throw new Error("Feed of videos are Empty")
        }

        return{
            feed: videos.map(video =>{
                return {
                    id: video.getId(),
                    title: video.getTitle(),
                    link: video.getLink(),
                    description: video.getDescription(),
                    creationDate: video.getCreationDate(),
                    photo: video.getPhoto(),
                    user_id: video.getUser_id(),
                    name: video.getName(),
                    userPhoto: video.getUserPhoto()
                }
            })
        }
    }
}

// export interface FeedOfVideosUCInput{
//     orderBy: string;
//     orderType: string;
//     page: number;
// }

export interface FeedOfVideosUCOutput {
    feed: FeedOfVideosUCOutputVideo[]
}

export interface FeedOfVideosUCOutputVideo{
    id: string;
    title: string;
    link: string;
    description: string;
    creationDate: Date;
    photo: string;
    name: string;
    user_id: string;
    userPhoto: string;
}

export enum FeedOrderType {
    ASC = "ASC",
    DESC = "DESC"
}