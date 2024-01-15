import { Component, OnInit } from '@angular/core';
import { AddProductsService } from '../services/add-products.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{
  errorDescription:string='';
  constructor(private product:AddProductsService){}
  ngOnInit(): void {
    
  }
  submit(data:Product){
    console.log(data);
    this.product.addProduct(data).subscribe((res)=>{
      console.log(res);
      if (res) {
        this.errorDescription = "Data added Successfully";
      }
      setTimeout(() => {this.errorDescription = ''},3000);
      
    })
    
  }


}
