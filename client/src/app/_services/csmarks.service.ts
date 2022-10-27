import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mark } from '../_models/mark';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CsmarksService {
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
    })
  }

  getCSMark(username: string) {

    return this.http.get<Mark[]>(this.baseUrl + 'Mark/' + username);
  }

  
  addMark(mark: number) {
    return this.http.post<Mark>(this.baseUrl, + 'Mark/'+ mark);
  }
}
