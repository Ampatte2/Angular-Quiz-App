import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Problem } from '../problem.model';
import { Store, select } from '@ngrx/store';
import ProblemState from '../store/problem.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  constructor( private store: Store<{Results: ProblemState}>, private router: Router) {
    this.problems$ = store.pipe(select("Results"));
   }
  @HostListener('window:resize', ["$event"])
  
  gridCol:number=2;
  problems$: Observable<ProblemState>;
  ProblemSubscription: Subscription;
  Problem: Problem[];
  Error: Boolean = false;
  public innerWidth: any;

  onResize(event){
    console.log(window.innerWidth)
    this.innerWidth = window.innerWidth;
    this.resizer(this.innerWidth);
  }

  ngOnInit() {
    this.ProblemSubscription = this.problems$.pipe(map(x=>{
      this.Problem = [...x.Results];
    })).subscribe(()=>{
      if(this.Problem.length>0){
        this.Error=false;
      }else{
        this.Error=true;
      }
    });
    this.innerWidth=window.innerWidth;
    this.resizer(this.innerWidth)
    
  }

  navigateToView(id){
    console.log(id)
    this.router.navigate([`viewresult/${id}`]);
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
