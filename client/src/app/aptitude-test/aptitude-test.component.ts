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
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions() {
    this.questionService.getAptitudeQuestionJson()
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
      
    }
    this.CSpoints += option.weight[0];
      this.DSpoints += option.weight[1];
      this.ISpoints += option.weight[2];       
      setTimeout(() => {
        this.currentQuestion++;
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

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
}
