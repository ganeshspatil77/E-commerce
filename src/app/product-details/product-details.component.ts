import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductsService } from '../services/add-products.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails:undefined|Product;
  productQuantity:number=1;
  constructor(private activate:ActivatedRoute, private product:AddProductsService){}
  ngOnInit(): void {
    let data = this.activate.snapshot.paramMap.get('productId');
    console.log(data);
    data && this.product.getProduct(data).subscribe((result)=>{
      this.productDetails  =  result;
      
    })
    
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity +=1
    }else if(this.productQuantity>1 && val==='minus'){
     this.productQuantity -=1
    }
  }

  addToCart(){
    if(this.productDetails){
      this.productDetails.quantity = this.productQuantity
     if (!localStorage.getItem('user')) {
      console.log(this.productDetails);  
      this.product.localAddToCart(this.productDetails)
     }
     
    }
  }

}
