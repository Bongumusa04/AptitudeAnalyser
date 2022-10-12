import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { take } from 'rxjs/operators';
import { Project } from '../_models/project';
import { Member } from '../_models/member';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() member: User;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-project',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
    });
  
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const project: Project = JSON.parse(response);
        this.user.projects.push(project);
      }
    };
  }

  deleteProject(projectId: number) {
    this.accountService.deleteProject(projectId).subscribe(() => {
      this.member.projects = this.member.projects.filter(x => x.id !== projectId);
    });
  }


}
