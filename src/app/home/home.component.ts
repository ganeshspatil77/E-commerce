import { Component, OnInit } from '@angular/core';
import { AddProductsService } from '../services/add-products.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularImages:undefined|Product[];
  trendingProducts:undefined|Product[];
  constructor(private product:AddProductsService){}
  ngOnInit(): void {
   this.popularImageToDisplay();
   this.trendingProductsToDisplay();
  }

  popularImageToDisplay(){
    this.product.popularProducts().subscribe((data)=>{
      this.popularImages = data;
      console.log(this.popularImages);
      
    })
  }

  trendingProductsToDisplay(){
    this.product.trendyProducts().subscribe((data)=>{
      this.trendingProducts = data;
    })
  }



}
