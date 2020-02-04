import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {User} from "./login/user.model";
import {shareReplay, tap, catchError} from "rxjs/operators";
import * as moment from "moment";
import {environment} from "../environments/environment"
import { Store } from '@ngrx/store';
import {Problem} from "./problem.model"
import * as ProblemActions from "./store/problem.actions";
import ProblemState from './store/problem.state';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthService{
    constructor(private http: HttpClient, private store: Store<{MyProblems: ProblemState}>, private router: Router){ }

    

    login(user:User){

        //redirects if successful login
        let redirectFun = function(data, router){
            if(data.id){
                router.navigate(["myproblems"])
            }else{
                return;
            }
        }

        if(user.username !=="" && user.password !== ""){
            return this.http.post(`/login`, {user}).pipe(tap(this.setSession), tap(data=>this.store.dispatch(ProblemActions.MyProblems({user: data.id}))), tap(data=> redirectFun(data, this.router)) , shareReplay());
        }
    }
    
    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("username");
        this.router.navigate([""])
    }
    register(user:User){
        return this.http.post(`/register`, {user}).pipe(shareReplay())
    }
    public isLoggedIn(){
        let islogged = moment().isBefore(this.getExpiration());
        return moment().isBefore(this.getExpiration());
    }
    getExpiration(){
        const expiration = localStorage.getItem("expires_at");
        const expires_at = JSON.parse(expiration);
        return moment(expires_at);
    }

    private setSession(authResult){
        const expiresAt = moment().add(authResult.expiresIn, "second");
        localStorage.setItem("token", authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        localStorage.setItem("id", authResult.id)
    }
}