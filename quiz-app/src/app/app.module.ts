import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProblemDisplayComponent } from './problem-display/problem-display.component';
import { MyProblemsComponent } from './my-problems/my-problems.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {problemReducer} from "./store/problem.reducer";
import { EffectsModule } from '@ngrx/effects';
import { ProblemEffects } from './store/problem.effects';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ProblemModalComponent } from './problem-modal/problem-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ViewProblemComponent } from './view-problem/view-problem.component';
import { ImageHandlerDirective } from './directives/image-handler.directive';
import { ViewMyproblemComponent } from './view-myproblem/view-myproblem.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ViewResultComponent } from './view-result/view-result.component';
import {MatGridListModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    ProblemDisplayComponent,
    MyProblemsComponent,
    LoginComponent,
    ProblemModalComponent,
    RegisterModalComponent,
    ViewProblemComponent,
    ImageHandlerDirective,
    ViewMyproblemComponent,
    SearchbarComponent,
    SearchresultComponent,
    ViewResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatGridListModule,
    StoreModule.forRoot({Problems: problemReducer, MyProblems: problemReducer, Results: problemReducer}),
    EffectsModule.forRoot([ProblemEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
