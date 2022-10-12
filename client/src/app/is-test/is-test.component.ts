import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-is-test',
  templateUrl: './is-test.component.html',
  styleUrls: ['./is-test.component.css']
})
export class IsTestComponent implements OnInit {
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
      JSON.parse(localStorage.getItem('isMarks'))
    }
  }
  getAllQuestions() {
    this.questionService.getISQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      localStorage.setItem('isMark', JSON.stringify(this.points));
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 1;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

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
