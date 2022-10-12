import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ProjectChallengesComponent } from './project-challenges/project-challenges.component';
import { AnalyserComponent } from './analyser/analyser.component';
import { CsTestComponent } from './cs-test/cs-test.component';
import { ChangeBgDirective } from './analyser/change-bg.directive';
import { IsTestComponent } from './is-test/is-test.component';
import { AptitudeTestComponent } from './aptitude-test/aptitude-test.component';
import { LandingComponent } from './landing/landing.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoEditComponent } from './modals/todo-edit/todo-edit.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TextInputComponent,
    DateInputComponent,
    PhotoEditorComponent,
    TodoDetailComponent,
    CalculatorComponent,
    ProjectChallengesComponent,
    AnalyserComponent,
    CsTestComponent,
    ChangeBgDirective,
    IsTestComponent,
    AptitudeTestComponent,
    LandingComponent,
    ConfirmDialogComponent,
    TodoAddComponent,
    TodoEditComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
