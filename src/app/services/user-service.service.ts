import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isLoginFailed = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  addUser(data: signUp) {
    this.http.post('http://localhost:3000/users', data).subscribe((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigateByUrl('/')
      }

    })
  }

  logIn(data: login) {
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.isLoginFailed.emit(false);

        this.router.navigateByUrl('/');
        console.log('user logged in ');

      } else {
        console.log('faileed');
        this.isLoginFailed.emit(true);

      }

    })
  }

  userRelode() {
    if (localStorage.getItem('user')) {
      console.log('Initial commit');
      this.router.navigateByUrl('/')
    }
  }
}
