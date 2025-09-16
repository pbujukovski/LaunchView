import { Mission } from "./mission.model";

export interface MissionResponse{
    docs: Mission[];
    totalDocs: number
}