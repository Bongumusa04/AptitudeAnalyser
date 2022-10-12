import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { ToDo } from 'src/app/_models/ToDo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  todo: ToDo;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;
  todos: ToDo[] = [];
  user:User;

  constructor(public bsModalRef: BsModalRef,  private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
      this.user.todo = this.todos; 
    });
   }

  ngOnInit(): void {
  }

  confirm() {
    this.result = true;
    this.bsModalRef.hide();
  }
  
  decline() {
    this.result = false;
    this.bsModalRef.hide();
  }

}
