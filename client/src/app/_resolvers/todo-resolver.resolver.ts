import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToDo } from '../_models/ToDo';
import { ToDoService } from '../_services/todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoResolverResolver implements Resolve<ToDo> {
  constructor(private todoService: ToDoService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ToDo> {
    return this.todoService.getList(parseInt(route.paramMap.get('id')));
  }
}
