import { Component, OnInit, HostListener } from '@angular/core';
import * as ProblemActions from "../store/problem.actions"
import { Problem } from '../problem.model';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import ProblemState from '../store/problem.state';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-problems',
  templateUrl: './my-problems.component.html',
  styleUrls: ['./my-problems.component.css']
})
export class MyProblemsComponent implements OnInit {

  title: string;
  description: string;
  answer: string;
  framework: string;
  difficulty: string;
  img: string;
  author: string;
  type: string;
  id: number;
  problems$: Observable<ProblemState>;
  ProblemSubscription: Subscription;
  MyProblemList: Problem[];
  gridCol:number=2;

  public innerWidth: any;
  
  
  
  constructor(private store: Store<{MyProblems:ProblemState}>, private router: Router) {
    this.problems$ = store.pipe(select("MyProblems"))  
  }
  @HostListener('window:resize', ["$event"])
  
  ngOnInit() {
    this.ProblemSubscription = this.problems$.pipe(map(x=>{
      this.MyProblemList= x.MyProblems;
    })).subscribe();

    this.innerWidth=window.innerWidth;
    this.resizer(this.innerWidth)

  }
  onResize(event){
    this.innerWidth = window.innerWidth;
    this.resizer(this.innerWidth)
    console.log(this.innerWidth);
  }
  
  createProblem(){
    const myProblem: Problem = {title: this.title, description: this.description, answer: this.answer, 
                              framework: this.framework, difficulty: this.difficulty, 
                              img: this.img, author: this.author, id: this.id}
    
  }

  navigate(id){
    this.router.navigate([`viewmyproblem/${id}`]);
  }

  resizer(width){
    if(width>1200){
      this.gridCol = 5;
    }else if(width>780){
      this.gridCol = 4;
    }else if(width>660){
      this.gridCol = 3;
    }else{
      this.gridCol =2;
    }
  }


}
