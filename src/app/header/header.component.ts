import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AddProductsService } from '../services/add-products.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutType: string = 'default';
  sellerName: string = '';
  username: string = '';
  searchResult: undefined | Product[];
  constructor(private route: Router, private product: AddProductsService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {

      if (val.url) {
        if (localStorage.getItem('seller')) {
          this.menutType = 'seller'
          let sellerdata = localStorage.getItem('seller');
          let sellername = sellerdata && JSON.parse(sellerdata)[0];
          this.sellerName = sellername.name;
        } else if (localStorage.getItem('user')) {
          let userData = localStorage.getItem('user');
          let userName = userData && JSON.parse(userData);
          console.log(userName);
          
          this.username = userName.name;
          this.menutType = 'user'

        } else {
          this.menutType = 'default'

        }
      }

    })
  }

  LogOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  logOutUser(){
    localStorage.removeItem('user');
    this.route.navigateByUrl('/')
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((result) => {

        this.searchResult = result;

      })
    }
  }

  submitSearch(val: string) {
    console.log(val);
    this.route.navigate([`search/${val}`])

  }

  redirectToDetails(val: number) {
    this.route.navigate(['/details/' + val]);
  }

  closeSearch() {
    this.searchResult = undefined;
  }

}
