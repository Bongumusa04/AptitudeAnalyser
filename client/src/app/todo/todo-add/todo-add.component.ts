import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pagination } from 'src/app/_models/pagination';
import { ToDo } from 'src/app/_models/ToDo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { ToDoService } from 'src/app/_services/todo.service';
import { map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TodoEditComponent } from 'src/app/modals/todo-edit/todo-edit.component';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  todos: ToDo[] = [];
  todo: ToDo;
  bsModalRef: BsModalRef;
  pagination: Pagination;     
  pageNumber = 1;
  pageSize = 10;
  loading = false;
  form: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute,  private toastr: ToastrService, private accountService: AccountService, private todoService: ToDoService,
    private fb: FormBuilder, private confirmService: ConfirmService, private modalService: BsModalService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
        this.user = user;
        this.user.todo = this.todos; 
      });
  
    }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.todo = data.todo;
    });
    this.initializeForm();
    this.loadLists();
  }

  loadLists(){
    this.loading = true;
    this.todoService.getLists(this.pageNumber,this.pageSize).subscribe(response => {
      this.todos = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
  editList(id: number){
    this.todoService.getList(this.todo.id).subscribe(() => {
      this.todos = this.todos.splice(this.todos.findIndex(m => m.id === id), 1);
    });
   }

  deleteList(id:number){
    this.confirmService.confirm('Confirm delete item', 'This cannot be undone').subscribe(results => {
      if(results){
        this.todoService.deleteList(id).subscribe(() => {
          this.todos.splice(this.todos.findIndex(m => m.id === id), 1);
          this.toastr.success('item deleted successfully');
        });
      }
    })
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ["",Validators.required],
      description: ["",Validators.required],
      date: ["",Validators.required],
     
    });}

    onSubmit() {
      this.todoService.addList(this.form.value).subscribe(() => {
        this.bsModalRef.hide();
        window.location.reload();
       }, error => {
        console.log(error);
          this.form.reset();
        });
      } 

    pageChanged(event: any){
      this.pageNumber = event.page;
      this.loadLists();
    }

    openEditModal() {
      const config = {
        class: 'modal-dialog-centered modal-lg'
      }
      this.bsModalRef = this.modalService.show(TodoEditComponent, config);
    }

}
