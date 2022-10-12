import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { ToDo } from '../_models/ToDo';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  baseUrl = environment.apiUrl;
  toDo: ToDo[]=[];
  user: User;
  paginatedResult: PaginatedResult<ToDo[]> = new PaginatedResult<ToDo[]>();

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
    })
  }

  getLists(pageNumber?: number, pageSize?: number) {
    let params = new HttpParams();

    if(pageNumber !== null && pageSize !== null){
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    }

    return this.http.get<ToDo[]>(this.baseUrl + 'todo/', {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if(response.headers.get('Pagination') !== null){
            this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResult;
        })
      );
  }

  getList(id: number) {
    return this.http.get<ToDo>(this.baseUrl + 'todo/' + id)
  }

  updateList(id, todo: ToDo) {
    console.log(todo);
    return this.http.put(this.baseUrl + 'todo/' + id, todo);
  }

  addList(todo: ToDo) {
    return this.http.post<ToDo>(this.baseUrl + 'todo/', todo);
  }

  deleteList(id: number) { 
    return this.http.delete<ToDo>(this.baseUrl + 'todo/' + id);
  }
}
