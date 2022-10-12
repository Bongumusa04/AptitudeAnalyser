import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ToDo } from 'src/app/_models/ToDo';
import { AccountService } from 'src/app/_services/account.service';
import { ToDoService } from 'src/app/_services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  todos: ToDo[] = [];
  todo: ToDo;
  id: number;
  editForm: FormGroup;
  formattedDate: string;
  
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private todoService: ToDoService, private toastr: ToastrService,
    private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.loadList();
  }


  initialiseForm() {
    this.editForm = this.fb.group({
    date: [this.formattedDate, Validators.required],
    name: [this.todo.name, Validators.required, Validators.required],
    description: [this.todo.description, Validators.required]
    
  })
  console.log("date: " + this.formattedDate)
}

  loadList() {
    let currentTodoId = JSON.parse(localStorage.getItem('currentTodo'))?.id;
    this.todoService.getList(currentTodoId).subscribe(todo => {
      this.todo = todo;
      //this.formattedDate = this.datePipe.transform((this.todo.date), 'dd-MMM-yyyy');
      this.initialiseForm();
    })
  }

  editList(id: number){
    this.todoService.getList(this.todo.id).subscribe(() => {
      this.todos = this.todos.splice(this.todos.findIndex(m => m.id === id), 1);
      this.toastr.success('List updated successfully');
      this.loadList();
      this.editForm.reset(this.todo)
    });
   }
  
  updateList() {
    this.todoService.updateList(this.todo.id, this.editForm.value).subscribe(() => {
      this.toastr.success('List updated successfully');
      this.loadList();
      this.editForm.reset(this.todo)
    })    
  }

}
