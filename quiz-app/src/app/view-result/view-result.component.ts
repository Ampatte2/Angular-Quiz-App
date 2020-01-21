import { Component, Input, OnInit } from '@angular/core';
import { Problem } from '../problem.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import ProblemState from "../store/problem.state";
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ProblemActions from "../store/problem.actions";

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  @Input() view:string;
  constructor(private router: Router, private store: Store<{Results:ProblemState}>, private route: ActivatedRoute) {
    this.problem$ = store.pipe(select("Results"));
   }
  
   ngOnInit(){
    
    
    this.ProblemSubscription = this.problem$.pipe(map(x=>{
       this.Problem = x.Results.filter(item=>item.id === this.id)
     })).subscribe();
     
   }
  id = parseInt(this.route.snapshot.paramMap.get("id"));
  problem$: Observable<ProblemState>;
  ProblemSubscription: Subscription;
  Problem: Problem[];
  isCollapsed: boolean= true;
  success:boolean=false;

  addToMyProblems(id){
    console.log(id);
    this.success = true;
    let userId = parseInt(localStorage.getItem("id"));
    this.store.dispatch(ProblemActions.AddProblem({userId: userId, problemId: id}))
  }

  seeProblem(){
    console.log(this.Problem, this.problem$, this.id)
  }

}