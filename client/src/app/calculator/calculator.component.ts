import { Component, OnInit } from '@angular/core';
import { Mark } from '../_models/mark';
import { Subject } from '../_models/subject';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  marks: Mark[];
  total = 0;
  public subjectList: Array<Subject>
  public markList: any = [];
  remove: HTMLElement | null;

  L1marks: Array<Mark> = [{id:8,subjectMark:'90% - 100% (level 8)'}, 
    {id:7,subjectMark:'80% - 89% (level 7)'},
    {id:6,subjectMark:'70% - 79% (level 6)'},
    {id:5,subjectMark:'60% - 69% (level 5)'},
    {id:4,subjectMark:'50% - 59% (level 4)'},
    {id:3,subjectMark:'40% - 49% (level 3)'},
    {id:2,subjectMark:'30% - 39% (level 2)'},
    {id:1,subjectMark:'0% - 29% (level 1)'}];
    mark1:number = null;

    L2marks: Array<Mark> = [{id:8,subjectMark:'90% - 100% (level 8)'}, 
    {id:7,subjectMark:'80% - 89% (level 7)'},
    {id:6,subjectMark:'70% - 79% (level 6)'},
    {id:5,subjectMark:'60% - 69% (level 5)'},
    {id:4,subjectMark:'50% - 59% (level 4)'},
    {id:3,subjectMark:'40% - 49% (level 3)'},
    {id:2,subjectMark:'30% - 39% (level 2)'},
    {id:1,subjectMark:'0% - 29% (level 1)'}];
    mark2:number = null;

    Mathsmarks: Array<Mark> = [{id:8,subjectMark:'90% - 100% (level 8)'}, 
    {id:7,subjectMark:'80% - 89% (level 7)'},
    {id:6,subjectMark:'70% - 79% (level 6)'},
    {id:5,subjectMark:'60% - 69% (level 5)'},
    {id:4,subjectMark:'50% - 59% (level 4)'},
    {id:3,subjectMark:'40% - 49% (level 3)'},
    {id:2,subjectMark:'30% - 39% (level 2)'},
    {id:1,subjectMark:'0% - 29% (level 1)'}];
    markM:number= null;

    Lomarks: Array<Mark> = [{id:8,subjectMark:'90% - 100% (level 8)'}, 
    {id:7,subjectMark:'80% - 89% (level 7)'},
    {id:6,subjectMark:'70% - 79% (level 6)'},
    {id:5,subjectMark:'60% - 69% (level 5)'},
    {id:4,subjectMark:'50% - 59% (level 4)'},
    {id:3,subjectMark:'40% - 49% (level 3)'},
    {id:2,subjectMark:'30% - 39% (level 2)'},
    {id:1,subjectMark:'0% - 29% (level 1)'}];
    markL:number = null;

    Physicsmarks: Array<Mark> = [{id:8,subjectMark:'90% - 100% (level 8)'}, 
    {id:7,subjectMark:'80% - 89% (level 7)'},
    {id:6,subjectMark:'70% - 79% (level 6)'},
    {id:5,subjectMark:'60% - 69% (level 5)'},
    {id:4,subjectMark:'50% - 59% (level 4)'},
    {id:3,subjectMark:'40% - 49% (level 3)'},
    {id:2,subjectMark:'30% - 39% (level 2)'},
    {id:1,subjectMark:'0% - 29% (level 1)'}];
    markPs:number = null;

    S6marks: Array<Mark> = [{id:8,subjectMark:'90% - 100% (level 8)'}, 
    {id:7,subjectMark:'80% - 89% (level 7)'},
    {id:6,subjectMark:'70% - 79% (level 6)'},
    {id:5,subjectMark:'60% - 69% (level 5)'},
    {id:4,subjectMark:'50% - 59% (level 4)'},
    {id:3,subjectMark:'40% - 49% (level 3)'},
    {id:2,subjectMark:'30% - 39% (level 2)'},
    {id:1,subjectMark:'0% - 29% (level 1)'}];
    markS6:number = null;

    S7marks: Array<Mark> = [{id:8,subjectMark:'90% - 100% (level 8)'}, 
    {id:7,subjectMark:'80% - 89% (level 7)'},
    {id:6,subjectMark:'70% - 79% (level 6)'},
    {id:5,subjectMark:'60% - 69% (level 5)'},
    {id:4,subjectMark:'50% - 59% (level 4)'},
    {id:3,subjectMark:'40% - 49% (level 3)'},
    {id:2,subjectMark:'30% - 39% (level 2)'},
    {id:1,subjectMark:'0% - 29% (level 1)'}];
    markS7:number = null;



  language1: Array<Subject> = [{id:1,subjectName:'Afrikaans Home Language'}, 
  {id:2,subjectName:'English Home Language'},
  {id:3,subjectName:'IsiZulu Home Language'},
  {id:4,subjectName:'IsiNdebele Home Language'},
  {id:5,subjectName:'IsiSwati Home Language'},
  {id:6,subjectName:'SeSotho Home Language'},
  {id:7,subjectName:'Sepedi Home Language'},
  {id:8,subjectName:'Setshwana Home Language'},
  {id:9,subjectName:'IsiXhosa Home Language'},
  {id:10,subjectName:'Tshivenda Home Language'},
  {id:11,subjectName:'Xitsonga Home Language'}];
  Language1: number = null;

  language2: Array<Subject> = [{id:1,subjectName:'Afrikaans First Additional Language'}, 
  {id:2,subjectName:'English First Additional Language'},
  {id:3,subjectName:'IsiZulu First Additional Language'},
  {id:4,subjectName:'IsiNdebele First Additional Language'},
  {id:5,subjectName:'IsiSwati First Additionalome Language'},
  {id:6,subjectName:'SeSotho First Additional Language'},
  {id:7,subjectName:'Sepedi First Additional Language'},
  {id:8,subjectName:'Setshwana First Additional Language'},
  {id:9,subjectName:'IsiXhosa First Additional Language'},
  {id:10,subjectName:'Tshivenda First Additional Language'},
  {id:11,subjectName:'Xitsonga First Additional Language'}];
  Language2: number = null;

  maths: Array<Subject> = [{id:1,subjectName:'Mathematics'},
  {id:1,subjectName:'Maths Literacy'}];
  Maths:number = null;

  lo: Array<Subject> = [{id:1,subjectName:'Life Orientation'}];
  Lo:number = null;

  physics: Array<Subject> = [{id:1,subjectName:'Physical Sciences'}];
 Physics: number = null;

 subject6: Array<Subject> = [{id:1,subjectName:'Afrikaans Second Additional Language'}, 
  {id:2,subjectName:'English Second Additional Language'},
  {id:3,subjectName:'IsiZulu Second Additional Language'},
  {id:4,subjectName:'IsiNdebele Second Additional Language'},
  {id:5,subjectName:'IsiSwati Second Additionalome Language'},
  {id:6,subjectName:'SeSotho Second Additional Language'},
  {id:7,subjectName:'Sepedi Second Additional Language'},
  {id:8,subjectName:'Setshwana Second Additional Language'},
  {id:9,subjectName:'IsiXhosa Second Additional Language'},
  {id:10,subjectName:'Tshivenda Second Additional Language'},
  {id:11,subjectName:'Xitsonga Second Additional Language'},
  {id:12,subjectName:'Accounting'},
  {id:13,subjectName:'Agriculture'},
  {id:14,subjectName:'Arabic Second Additional Language'},
  {id:15,subjectName:'Business Studies'},
  {id:16,subjectName:'Civil Technology'},
  {id:17,subjectName:'Computer Applications Technology'},
  {id:18,subjectName:'Consumer Studies'},
  {id:19,subjectName:'Design'},
  {id:20,subjectName:'Dramatic Arts'},
  {id:21,subjectName:'Economics'},
  {id:22,subjectName:'Electrical Enguneerintg and Design'},
  {id:23,subjectName:'Geography'},
  {id:24,subjectName:'History'},
  {id:25,subjectName:'Information Technology'},
  {id:26,subjectName:'Life Sciences'},
  {id:27,subjectName:'Tourism'},
  {id:28,subjectName:'Music'},];
 Sub6: number = null;

 subject7: Array<Subject> = [{id:1,subjectName:'Afrikaans Second Additional Language'}, 
  {id:2,subjectName:'English Second Additional Language'},
  {id:3,subjectName:'IsiZulu Second Additional Language'},
  {id:4,subjectName:'IsiNdebele Second Additional Language'},
  {id:5,subjectName:'IsiSwati Second Additionalome Language'},
  {id:6,subjectName:'SeSotho Second Additional Language'},
  {id:7,subjectName:'Sepedi Second Additional Language'},
  {id:8,subjectName:'Setshwana Second Additional Language'},
  {id:9,subjectName:'IsiXhosa Second Additional Language'},
  {id:10,subjectName:'Tshivenda Second Additional Language'},
  {id:11,subjectName:'Xitsonga Second Additional Language'},
  {id:12,subjectName:'Accounting'},
  {id:13,subjectName:'Agriculture'},
  {id:14,subjectName:'Arabic Second Additional Language'},
  {id:15,subjectName:'Business Studies'},
  {id:16,subjectName:'Civil Technology'},
  {id:17,subjectName:'Computer Applications Technology'},
  {id:18,subjectName:'Consumer Studies'},
  {id:19,subjectName:'Design'},
  {id:20,subjectName:'Dramatic Arts'},
  {id:21,subjectName:'Economics'},
  {id:22,subjectName:'Electrical Enguneerintg and Design'},
  {id:23,subjectName:'Geography'},
  {id:24,subjectName:'History'},
  {id:25,subjectName:'Information Technology'},
  {id:26,subjectName:'Life Sciences'},
  {id:27,subjectName:'Tourism'},
  {id:28,subjectName:'Music'},];
 Sub7: number = null;



  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.total += (this.mark1 + this.mark2 + this.markM + this.markPs + this.markS6 + this.markS7)
    this.getAllSubjectss();
  }

  getAllSubjectss() {
    this.questionService.getSubjectsJson()
      .subscribe(res => {
        this.subjectList = res.subjects;
        this.markList = res.subjectMark;
      })
  }

  calculate(mark1: number, mark2: number, mark3: number, mark4: number, mark5: number, mark6: number): number {
    return this.total += (mark1 + mark2 + mark3 + mark4 + mark5 + mark6); 
    
  }

  CalculateAPS(mark1: number, mark2: number, mark3: number, mark4: number, mark5: number, mark6: number){
    this.total = 0;
    this.marks.forEach(mark => {
      (this.total += (mark1 + mark2 + mark3 + mark4 + mark5 + mark6)); 
      console.log(mark.id)
    })
  }

  OnRemoveItem(){
    this.remove =document.getElementById('remove');
    if(this.subject6.length > 1){
      this.subject6[0]
    }
  }

}
