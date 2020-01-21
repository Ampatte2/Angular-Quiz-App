import { Component, OnInit, HostListener} from '@angular/core';
import { Problem } from '../problem.model';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import ProblemState from '../store/problem.state';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-display',
  templateUrl: './problem-display.component.html',
  styleUrls: ['./problem-display.component.css']
})
export class ProblemDisplayComponent implements OnInit{
  
  
  
  constructor(private store: Store<{Problems:ProblemState}>, private router: Router) { 
    this.problems$ = store.pipe(select("Problems"))
  }
  @HostListener('window:resize', ["$event"])
  ngOnInit() {
    this.ProblemSubscription = this.problems$.pipe(map(x=>{
      this.ProblemList= [...x.Problems];
      
    })).subscribe();
    this.innerWidth=window.innerWidth;
    this.resizer(this.innerWidth)
    
  }
  gridCol:number=2;
  loading: boolean = false;
  problems$: Observable<ProblemState>;
  ProblemSubscription: Subscription;
  ProblemList: Problem[];
  public innerWidth: any;

  onResize(event){
    this.innerWidth = window.innerWidth;
    this.resizer(this.innerWidth);
  }

  navigateToView(id){
    this.router.navigate([`viewproblem/${id}`]);
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
