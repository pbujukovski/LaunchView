import { Core } from "./core.model";
import { Links } from "./links.model";

export class Mission {
    public id: string = "";
    
    public name: string = "";
    
    public date_utc: Date = new Date();
    
    public success: boolean = false;
    
    public details: string = "";
    
    public cores: Core[] = [];
    
    public links: Links = new Links();
}