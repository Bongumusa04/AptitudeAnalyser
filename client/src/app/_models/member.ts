import { Project } from './project';

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    gender: string;
    CsMarks: number;
    photos: Project[];
  }

