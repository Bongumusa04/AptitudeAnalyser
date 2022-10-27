import { Component, OnInit } from '@angular/core';
import { delay, interval, take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.css']
})
export class AnalyserComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  user: User
  constructor(public accountService: AccountService,private questionService: QuestionService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
      this.user.points = this.points; 
    });
  
   }

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
    if(this.points > 0){
      this.isQuizCompleted = true;
      JSON.parse(localStorage.getItem('dsMarks'))
    }
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
    this.getProgressPercent();
  }
  previousQuestion() {
    this.currentQuestion--;
    this.getProgressPercent();
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 1;
      localStorage.setItem('dsMark', JSON.stringify(this.points));
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 3000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 3000);

    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
}
