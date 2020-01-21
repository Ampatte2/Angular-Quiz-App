import { Component, Input, OnInit } from '@angular/core';
import { Problem } from '../problem.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import ProblemState from "../store/problem.state";
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ProblemActions from "../store/problem.actions";

@Component({
  selector: 'app-view-myproblem',
  templateUrl: './view-myproblem.component.html',
  styleUrls: ['./view-myproblem.component.css']
})
export class ViewMyproblemComponent implements OnInit {

  constructor(private router: Router, private store: Store<{MyProblems:ProblemState}>, private route: ActivatedRoute) {
    this.problem$ = store.pipe(select("MyProblems"));
   }
  
   ngOnInit(){
    
    
    this.ProblemSubscription = this.problem$.pipe(map(x=>{
       this.Problem = x.MyProblems.filter(item=>item.id === this.id)
     })).subscribe();
     
   }
  id = parseInt(this.route.snapshot.paramMap.get("id"));
  problem$: Observable<ProblemState>;
  ProblemSubscription: Subscription;
  Problem: Problem[];
  isCollapsed: boolean= true;

  click(){
    
    console.log(this.Problem)
    this.router.navigate([`myproblems`])
    
  }

  seeProblem(){
    console.log(this.Problem, this.problem$, this.id)
  }

}
