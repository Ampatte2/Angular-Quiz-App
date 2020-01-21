import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import ProblemState from '../store/problem.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as ProblemActions from "../store/problem.actions";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Input() view: string;
  description: string;
  framework: string;
  constructor(private store: Store<{MyProblems: ProblemState}>, private router:Router){ 
    this.problems$ = store.pipe(select("MyProblems"))
  }
  problems$: Observable<ProblemState>;
  ngOnInit() {
  }
  submit(){
    let query = {view: this.view, framework: this.framework, description: this.description, userid:localStorage.getItem("id")}
    this.store.dispatch(ProblemActions.Result({data:query}));
    this.router.navigate([`searchresult`])
  }
}
