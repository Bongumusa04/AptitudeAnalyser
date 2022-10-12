import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  user: User;

  constructor(private http : HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
    })
  }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }

  getCSQuestionJson(){
    return this.http.get<any>("assets/cs_questions.json");
  }

  getISQuestionJson(){
    return this.http.get<any>("assets/is_questions.json");
  }

  getAptitudeQuestionJson(){
    return this.http.get<any>("assets/aptitude_questions.json");
  }

  getSubjectsJson(){
    return this.http.get<any>("assets/subjects.json");
  }
}
