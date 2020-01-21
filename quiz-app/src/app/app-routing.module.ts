import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProblemDisplayComponent } from './problem-display/problem-display.component';
import { MyProblemsComponent } from './my-problems/my-problems.component';
import {ViewProblemComponent} from "./view-problem/view-problem.component";
import {ViewMyproblemComponent} from "./view-myproblem/view-myproblem.component";
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ViewResultComponent } from './view-result/view-result.component';


const routes: Routes = [
                        {path: "", component: MainMenuComponent},
                        {path:"problem/:id", component: ProblemDisplayComponent},
                        {path:"myproblems", component: MyProblemsComponent},
                        {path:"viewproblem/:id", component: ViewProblemComponent},
                        {path:"viewmyproblem/:id", component: ViewMyproblemComponent},
                        {path:"viewresult/:id", component: ViewResultComponent},
                        {path:"searchresult", component: SearchresultComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
