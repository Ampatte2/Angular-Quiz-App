import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import {AuthService} from "../auth-service.service";
import { User } from './user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;
  user = new User();
  error = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private modalService: NgbModal) {

    this.loginForm = this.fb.group({username: ["", Validators.required], password: ["", [Validators.required, Validators.minLength(6)]]})
    
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: "modal-basic-title"})
  }

  submit(){
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    
    if(this.user.username && this.user.password){
      this.authService.login(this.user).subscribe((data)=>{
        if(data.message){
          this.error = true;
        }else{
          this.modalService.dismissAll();
        }
      })
    }
  }

  

}
