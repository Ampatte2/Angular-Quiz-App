import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import ProblemState from './store/problem.state';
import * as ProblemActions from "./store/problem.actions";
import { ActivatedRoute } from '@angular/router';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<{MyProblems:ProblemState}>, private route: ActivatedRoute){

  }
  ngOnInit(){
    
    let id = parseInt(localStorage.getItem("id"));
    let framework = localStorage.getItem("framework");
    if(localStorage.getItem("token")){
      this.store.dispatch(ProblemActions.MyProblems({user: id}))
    }
    if(framework){
      this.store.dispatch(ProblemActions.GetProblem({payload: framework}))
    }
  }

}
