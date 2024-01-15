import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProductsService } from '../services/add-products.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  errorDescription: string = '';
  productData: undefined | Product;
  constructor(private route: ActivatedRoute, private product: AddProductsService, private router: Router) { }
  ngOnInit(): void {
    this.getSpecificProductId();
  }

  getSpecificProductId() {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.log(data);
      this.productData = data;

    })
  }

  submit(data: Product) {
    if (this.productData) {
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.errorDescription = 'Product Has Updated'
      }

    })
    setTimeout(() => {
      this.errorDescription = ''
      this.router.navigateByUrl('/seller-home')
    }, 2000);


  }
}
