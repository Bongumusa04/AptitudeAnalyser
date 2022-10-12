import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
cspoints: number;
dspoints: number;
ispoints: number;


  constructor(public accountService: AccountService, private router: Router) {
    this.cspoints = JSON.parse(localStorage.getItem('csMark'));
    this.dspoints = JSON.parse(localStorage.getItem('dsMark'));
    this.ispoints = JSON.parse(localStorage.getItem('isMark'));
   }
   

  ngOnInit(): void {
  }

}
