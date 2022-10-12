import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ToDo } from 'src/app/_models/ToDo';
import { ToDoService } from 'src/app/_services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo: ToDo;
  bsModalRef :BsModalRef;

  constructor(private todoService: ToDoService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteExpense() {
    if (confirm("Are you sure you want to delete this expense?")) {
      this.todoService.deleteList(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(response => {
        this.router.navigateByUrl('/todo');
        this.toastr.success('Project deleted successfully');
        //window.location.reload();
       }, error => {
        console.log(error);
       })
    }    
  }

}
