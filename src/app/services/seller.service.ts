import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginFailed = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(data: signUp) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.route.navigateByUrl('seller-home');
      console.log(result);
    })
  }

  RelodeSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);

    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.route.navigateByUrl('seller-home');
          console.log('user logged in ');

        } else {
          console.log('faileed');
          this.isLoginFailed.emit(true);

        }
      })
  }
}
