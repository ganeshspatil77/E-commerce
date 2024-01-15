import { Component, OnInit } from '@angular/core';
import { AddProductsService } from '../services/add-products.service';
import { Product } from '../data-type';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{

  productList: undefined|Product[];
  errorDescription:string=''
  icon=faTrash;
  editIcon=faEdit;
  constructor(private product:AddProductsService){}
  ngOnInit(): void {
   this.getProductList();
  }
 
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.errorDescription = 'Product Delete Succesfully'
        this.getProductList();
      }
      setTimeout(() => {
        this.errorDescription =''
      }, 3000);
    })
  
  }

  getProductList(){
    this.product.productList().subscribe((result)=>{
      console.log(result);
      this.productList=result;
      
    })
  }


 
}
