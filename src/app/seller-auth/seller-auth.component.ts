import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  userSignUp:signUp={
    name:'',
    password:'',
    email:''
  }

  userlogin:login={
    email:'',
    password:'' 
  }
  IsLogin=false;
  displayMsg='';

  constructor(private seller:SellerService, private router:Router){}

  ngOnInit(): void {
    this.seller.RelodeSeller();
    console.log("Learn Git");
    
  }


  signup(signup:signUp) : void{
    this.seller.userSignUp(signup)
  }

  login(login:login) : void{
    this.seller.userLogin(login);
    this.seller.isLoginFailed.subscribe((Error)=>{
      if (Error) {
        this.displayMsg='Email or Password is Invalid...'
      }
    })
  }

  openLogin(){
    this.IsLogin=true;
  }

  openSignUp(){
    this.IsLogin=false;
  }

}
