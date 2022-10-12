import { Mark } from "./mark";
import { Project } from "./project";
import { ToDo } from "./ToDo";

export interface User{
    username: string;
    token: string;
    photoUrl: string;
    todo: ToDo[];
    markCs: Mark[];
    points:number; 
    projects: Project[];
}

