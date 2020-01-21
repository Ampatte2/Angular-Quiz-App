import { Component, OnInit } from '@angular/core';
import * as ProblemActions from "../store/problem.actions"
import { Problem } from '../problem.model';
import { Store, select } from '@ngrx/store';
import ProblemState from '../store/problem.state';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  
  private userData;

  constructor(private store: Store<{Problems:ProblemState}>, private router: Router) { }

  ngOnInit() {
    
  }
  
  goTo(value){
    this.store.dispatch(ProblemActions.GetProblem({payload: value}))
    localStorage.setItem("framework",`${value}`)
    this.router.navigate([`problem/${value}`])
  }

  
}
