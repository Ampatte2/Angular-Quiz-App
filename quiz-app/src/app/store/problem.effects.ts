import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import * as ProblemActions from "./problem.actions";
import {Problem} from "../problem.model";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProblemEffects{
    constructor(private http: HttpClient, private action$: Actions){}

    GetProblems$: Observable<Action> = createEffect(()=>
        this.action$.pipe(ofType(ProblemActions.GetProblem),
        mergeMap((action)=> this.http.get(`/category?type=${action.payload}`).pipe(map(data=>ProblemActions.SuccessGetProblem({data}))))
        )
    )

    MyProblems$: Observable<Action> = createEffect(()=>
        this.action$.pipe(ofType(ProblemActions.MyProblems), 
        mergeMap((action)=>this.http.get(`/myproblems?data=${action.user}`).pipe(map(data=>ProblemActions.SuccessMyProblems({data}))))
        
        )
    )    

    CreateProblem$: Observable<Action> = createEffect(()=>
        this.action$.pipe(ofType(ProblemActions.CreateProblem), 
        mergeMap((action)=>this.http.post(`/createproblem`, action).pipe(map((data: any)=>ProblemActions.AddProblem({userId: data.userId, problemId: data.problemId})
        )))
        
        )
    )

    AddProblem$: Observable<Action> = createEffect(()=>
        this.action$.pipe(ofType(ProblemActions.AddProblem),
        mergeMap((action)=>this.http.post(`/addproblem`, action).pipe(map((data: any)=>ProblemActions.MyProblems({user: parseInt(data.user)}))))
    )
    )

    Result$: Observable<Action> = createEffect(()=>this.action$.pipe(ofType(ProblemActions.Result),
        mergeMap((action)=>this.http.post(`/search`, action).pipe(map((data:any)=>ProblemActions.SuccessResult({data}))))
    ))
    
}