import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MessagesComponent } from './messages/messages.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ProjectChallengesComponent } from './project-challenges/project-challenges.component';
import { AnalyserComponent } from './analyser/analyser.component';
import { CsTestComponent } from './cs-test/cs-test.component';
import { IsTestComponent } from './is-test/is-test.component';
import { AptitudeTestComponent } from './aptitude-test/aptitude-test.component';
import { LandingComponent } from './landing/landing.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      
      {path: 'vault', component: MessagesComponent},
      {path: 'data_science', component: AnalyserComponent},
      {path: 'aptitude_test', component: AptitudeTestComponent},
      {path: 'information_systems', component: IsTestComponent},
      {path: 'computer_science', component: CsTestComponent},
      {path: 'challenges', component: ProjectChallengesComponent},
      {path: 'landing', component: LandingComponent},
      {path: 'todo', component: TodoAddComponent},
      {path: 'calculator', component: CalculatorComponent},
      {path: 'upload', component: UploadComponent}
    
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
