import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Problem} from "../problem.model"
import {Store} from "@ngrx/store";
import ProblemState from "../store/problem.state";
import * as ProblemActions from "../store/problem.actions";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-problem-modal',
  templateUrl: './problem-modal.component.html',
  styleUrls: ['./problem-modal.component.css']
})
export class ProblemModalComponent {
    
  newProblem = new Problem;
  problemForm: FormGroup;
  titleError: boolean = true;
  urlError: boolean = true;
  answerError: boolean = true;
  descriptionError: boolean = true;
  difficultyError: boolean = true;
  frameworkError: boolean = true;
  

  

  constructor(public modalService: NgbModal, private fb: FormBuilder, private store: Store<{MyProblems:ProblemState}>) {
    this.problemForm = this.fb.group({title: ["", [Validators.required, Validators.maxLength(35), Validators.minLength(5)]], description:["", Validators.required], framework:["", Validators.required], answer:["", Validators.required], difficulty:["", Validators.required], img:[""] } )
   }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: "modal-basic-title"})
  }

  submit(){
    if(this.problemForm.valid){
      this.newProblem.author = localStorage.getItem("id");
      this.store.dispatch(ProblemActions.CreateProblem({problem:this.newProblem}));
      this.modalService.dismissAll();
    }else{
      this.titleError = this.problemForm.get("title").valid
      this.urlError = this.problemForm.get("img").valid
      this.descriptionError = this.problemForm.get("description").valid
      this.answerError = this.problemForm.get("answer").valid;
      this.frameworkError = this.problemForm.get("framework").valid;
      this.difficultyError = this.problemForm.get("difficulty").valid;
    }
  }
  

}
