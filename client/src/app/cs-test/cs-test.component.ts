import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay, interval, take } from 'rxjs';
import { Mark } from '../_models/mark';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CsmarksService } from '../_services/csmarks.service';
import { QuestionService } from '../_services/question.service';
 
@Component({
  selector: 'app-cs-test',
  templateUrl: './cs-test.component.html',
  styleUrls: ['./cs-test.component.css']
})
export class CsTestComponent implements OnInit {
  @Input() markCs: Mark[] =[]
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  user: User;
  mark: Mark;
  marks: Mark[] = [];

 constructor(public accountService: AccountService,private questionService: QuestionService, private csMarksService: CsmarksService, private toastr: ToastrService) {
  this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
    this.user = user;
    this.user.points = this.points; 
    this.user.markCs = this.marks;
  });

  }

  ngOnInit(): void {
    if(parseInt(localStorage.getItem('csCurrentQ')) > 0){
      this.progress = JSON.parse(localStorage.getItem('csprogress'));
      this.currentQuestion = parseInt(localStorage.getItem('csCurrentQ'));
      this.correctAnswer = parseInt(localStorage.getItem('cscorrect'));
      this.inCorrectAnswer = parseInt(localStorage.getItem('csincorrect'));
      this.isQuizCompleted = JSON.parse(localStorage.getItem('csCompleted'));
    }
    this.getAllQuestions();
    this.startCounter();
    if(this.points > 0){
      this.isQuizCompleted = true;
    }
  }

 
  getAllQuestions() {
    this.questionService.getCSQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
    this.inCorrectAnswer++;
    localStorage.setItem('csincorrect', JSON.stringify(this.inCorrectAnswer));
    localStorage.setItem('csCurrentQ', JSON.stringify( this.currentQuestion));
    this.getProgressPercent();
  }
  previousQuestion() {
    this.currentQuestion--;
    localStorage.setItem('csCurrentQ', JSON.stringify( this.currentQuestion));
    this.getProgressPercent();
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length ){
      this.isQuizCompleted = true;
      localStorage.setItem('csCompleted', JSON.stringify( this.isQuizCompleted));
      this.stopCounter();

    }
    if (option.correct) {
      this.points += 1;
      localStorage.setItem('csMark', JSON.stringify(this.points));
      this.correctAnswer++;
      localStorage.setItem('cscorrect', JSON.stringify(this.correctAnswer));
      setTimeout(() => {
        this.currentQuestion++;
        localStorage.setItem('csCurrentQ', JSON.stringify( this.currentQuestion));
        this.resetCounter();
        this.getProgressPercent();
      }, 3000);

    } else {
      setTimeout(() => {
        this.currentQuestion++;
        localStorage.setItem('csCurrentQ', JSON.stringify( this.currentQuestion));
        this.inCorrectAnswer++;
        localStorage.setItem('csincorrect', JSON.stringify(this.inCorrectAnswer));
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
    localStorage.removeItem('csprogress');
    localStorage.removeItem('csCurrentQ');
    localStorage.removeItem('cscorrect');
    localStorage.removeItem('csincorrect');
    localStorage.removeItem('csisMarks');
    localStorage.removeItem('csCompleted');

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    localStorage.setItem('csprogress', JSON.stringify(this.progress));
    return this.progress;

  }
  onSubmit(mark: number) {
    this.csMarksService.addMark(mark).subscribe(CsMark => 
      {
        this.markCs.push(CsMark);
        this.toastr.success('Marks Added');
      });
    } 

}
