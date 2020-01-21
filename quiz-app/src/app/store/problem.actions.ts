import {createAction, props} from "@ngrx/store";
import { Problem } from '../problem.model';






export const CreateProblem = createAction("[Problem] - CreateProblem", props<{problem: Problem}>());

export const SuccessCreateProblem = createAction("[Problem] - Created Problem", props<{data: any}>());

export const GetProblem = createAction("[Problem] - Get Problems", props<{payload:string}>());

export const SuccessGetProblem = createAction("[Problem] - Insert Problems", props<{data}>() );

export const MyProblems = createAction("[Problem] - My Problems", props<{user: number}>());

export const SuccessMyProblems = createAction("[Problem] - Insert MyProblems", props<{data}>());

export const AddProblem = createAction("[Problem]- AddProblem", props<{userId:any, problemId: any}>());

export const SuccessAddProblem = createAction("[Problem] - Added Problem", props<{data: any}>());

export const Result = createAction("[Result] - Get Search", props<{data}>());

export const SuccessResult = createAction("[Result] - Adding Result", props<{data: any}>());