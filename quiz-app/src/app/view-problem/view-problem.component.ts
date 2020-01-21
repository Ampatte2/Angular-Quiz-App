import { Component, Input, OnInit } from '@angular/core';
import { Problem } from '../problem.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import ProblemState from "../store/problem.state";
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ProblemActions from "../store/problem.actions";

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit{
  constructor(private router: Router, private store: Store<{Problems:ProblemState}>, private route: ActivatedRoute) {
    this.problem$ = store.pipe(select("Problems"));
   }
  
   ngOnInit(){
    
    
    this.ProblemSubscription = this.problem$.pipe(map(x=>{
       this.Problem = x.Problems.filter(item=>item.id === this.id)
     })).subscribe();
     if(this.Problem.length===0){
      this.router.navigate([""])
    }
     
   }
  id = parseInt(this.route.snapshot.paramMap.get("id"));
  problem$: Observable<ProblemState>;
  ProblemSubscription: Subscription;
  Problem: Problem[];
  isCollapsed: boolean= true;
  success:boolean=false;

  click(){
    
    console.log(this.Problem)
    this.router.navigate([`problem/${this.Problem[0].framework}`])
    
  }
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
