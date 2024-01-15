import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductsService } from '../services/add-products.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult:undefined|Product[];
  noItemFoundMessage='';

  constructor(private activateROute: ActivatedRoute, private product:AddProductsService){}
  ngOnInit(): void {
    let query = this.activateROute.snapshot.paramMap.get('query')
    console.log(query);
    query && this.product.searchProducts(query).subscribe((result)=>{
      console.log(result);
      
     if(result.length != 0){
      this.searchResult = result
     }else{
     this.noItemFoundMessage='No Item Found'; 
     console.log(this.noItemFoundMessage);
     
     }
    })
  }

}
