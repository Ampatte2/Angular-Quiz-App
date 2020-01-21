import {Action, createReducer, on, State} from "@ngrx/store";
import * as ProblemActions from "./problem.actions";
import ProblemState, { initializeState} from './problem.state';

export const initialState = initializeState();


const reducer = createReducer(
    initialState,
    on(ProblemActions.CreateProblem, state=>state),
    on(ProblemActions.GetProblem, state=>state),
    on(ProblemActions.MyProblems, state=>state),
    on(ProblemActions.SuccessGetProblem, (state: ProblemState, data: any)=>{return {...state, Problems: [...data.data], MyProblems:[...state.MyProblems], Results: [...state.Results]}}),
    on(ProblemActions.SuccessMyProblems, (state: ProblemState, data: any)=>{return {...state, Problems: [...state.Problems], MyProblems: [...data.data], Results: [...state.Results]}}),
    on(ProblemActions.SuccessCreateProblem, state=>state),
    on(ProblemActions.Result, state=>state),
    on(ProblemActions.SuccessResult, (state:ProblemState, data:any)=>{if(data.data.error){
        return {...state, Problems: [...state.Problems], MyProblems:[...state.MyProblems], Results:[...state.Results]}}
        return{...state, Problems: [...state.Problems], MyProblems:[...state.MyProblems], Results:[...data.data]}
    })
)

export function problemReducer(state: ProblemState | undefined, action: Action){

    return reducer(state, action);
}