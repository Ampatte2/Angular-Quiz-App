import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../login/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {registerMatch} from "./register-match.validator";
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent{

  registerForm:FormGroup;
  submitted = false;
  error = false;
  user = new User();

  constructor(public modalService: NgbModal, private formBuilder:FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      username:["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: [""]
    }, {validator: registerMatch("password", "confirmPassword")})
   }

  get f(){return this.registerForm.controls}
  
  open(content){
    this.modalService.open(content, {ariaLabelledBy: "modal-basic-title"})
  }

  submit(){
    this.submitted = true;
    
      
    if(this.registerForm.invalid){
      
      return;
    }else{
      this.user.password = this.registerForm.value.password;
      this.user.username = this.registerForm.value.username;

      this.authService.register(this.user).subscribe((data:any)=>{
        if(data.error){
          this.error= true;
          console.log(data.error)
        }else{
          this.authService.login(this.user).subscribe(data=>{
            console.log("login")
            this.modalService.dismissAll();
          });
          
        }
    });
      
      
    }
    
  }
}
