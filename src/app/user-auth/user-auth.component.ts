import { Component, OnInit } from '@angular/core';
import { login, signUp } from '../data-type';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  errorMsg:string='';
  toggleBetweenLoginSignUp:boolean=true;
  constructor(private userService:UserServiceService){}
  ngOnInit(): void {
    this.userService.userRelode();
  }

  signUp(val:signUp){
    this.userService.addUser(val)
    
  }
  logIn(userlogin:login){
    this.userService.logIn(userlogin)
    this.userService.isLoginFailed.subscribe((res)=>{
      if (res) {
        this.errorMsg='Please Enter valid user details'
      }else{
        this.errorMsg=''
      }
    })
    
  }
  gotoLogin(){
this.toggleBetweenLoginSignUp=false;
  }
  gotoSignUp(){
this.toggleBetweenLoginSignUp=true;
  }

  
}
