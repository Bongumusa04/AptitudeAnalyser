import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-aptitude-test',
  templateUrl: './aptitude-test.component.html',
  styleUrls: ['./aptitude-test.component.css']
})
export class AptitudeTestComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public CSpoints: number = 0;
  public DSpoints: number = 0;
  public ISpoints: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }
  getAllQuestions() {
    if(parseInt(localStorage.getItem('atCurrentQ')) > 0){
      this.progress = JSON.parse(localStorage.getItem('atprogress'));
      this.currentQuestion = parseInt(localStorage.getItem('atCurrentQ'));
      this.CSpoints = parseInt(localStorage.getItem('CSpoints'));
      this.DSpoints = parseInt(localStorage.getItem('DSpoints'));
      this.DSpoints = parseInt(localStorage.getItem('ISpoints'));
    }
    this.questionService.getAptitudeQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
    localStorage.setItem('atCurrentQ', JSON.stringify( this.currentQuestion));
    this.getProgressPercent();
  }
  previousQuestion() {
    this.currentQuestion--;
    localStorage.setItem('atCurrentQ', JSON.stringify( this.currentQuestion));
    this.getProgressPercent();
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      
    }
    this.CSpoints += option.weight[0];
      this.DSpoints += option.weight[1];
      this.ISpoints += option.weight[2];   
      localStorage.setItem('CSpoints', JSON.stringify( this.CSpoints));
      localStorage.setItem('DSpoints', JSON.stringify( this.DSpoints));
      localStorage.setItem('ISpoints', JSON.stringify( this.ISpoints));    
      setTimeout(() => {
        this.currentQuestion++;
        localStorage.setItem('atCurrentQ', JSON.stringify( this.currentQuestion));
        this.getProgressPercent();
      }, 1000);
  }

  resetQuiz() {
    this.getAllQuestions();
    this.ISpoints = 0;
    this.CSpoints = 0;
    this.DSpoints = 0;
    this.currentQuestion = 0;
    this.progress = "0";
    localStorage.removeItem('atprogress');
    localStorage.removeItem('atCurrentQ');
    localStorage.removeItem('CSpoints');
    localStorage.removeItem('DSpoints');
    localStorage.removeItem('ISpoints');
  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    localStorage.setItem('atprogress', JSON.stringify(this.progress));
    return this.progress;

  }
}
