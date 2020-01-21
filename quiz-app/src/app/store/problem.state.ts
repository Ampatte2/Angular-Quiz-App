import {Problem} from "../problem.model";

export default interface ProblemState{
    Results: Array<Problem>
    Problems: Array<Problem>
    MyProblems:Array<Problem>
    
}


// State needs myProblems and Problems Displays
export const initializeState = () : ProblemState =>{
    return {Results: Array<Problem>(),MyProblems:Array<Problem>(), Problems:Array<Problem>()};
}