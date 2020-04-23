import { Video } from "../entites/video";
import { Feed } from "../entites/feed";

export interface VideoGateway{
    checkVideoByLink(link: string): Promise<Video | undefined>;
    createVideo(video: Video): Promise<void>;
    getVideos(): Promise<Feed[] | undefined>;
    getVideoById(id: string): Promise<Feed | undefined>;
    deleteVideo(id: string, user_id: string): Promise<void>;
    updateVideo(id: string, user_id: string, title: string, description: string): Promise<void>;
    updateVideoTitle(id: string, user_id: string, title: string): Promise<void>;
    updateVideoDescription(id: string, user_id: string, description: string): Promise<void>;
    getAllUserVideos(id: string): Promise<Feed[] | undefined>;
}