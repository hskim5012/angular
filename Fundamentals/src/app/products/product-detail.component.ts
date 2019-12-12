import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router, Params, } from '@angular/router';
import {ProductService } from './product.service';

@Component({
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle:string = 'Product Detail';
  product: IProduct | undefined;
  errorMessage: object[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    // shortcut to change the string to a numericId (+)
    let param = +this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    let observable = this.productService.getProduct(id);
    observable.subscribe(
      data => this.product = data,
       error => this.errorMessage = <any>error);
    }

  onBack() {
    this.router.navigate(['/products']);
  }

}
