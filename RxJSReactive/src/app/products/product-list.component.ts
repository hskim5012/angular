import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of, EMPTY, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent   {
  pageTitle = 'Product List';
  errorMessage = '';
  // selectedCategoryId = 1;

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  //for below products$
  //this.categorySelectedAction$.pipe(startWith(0));


  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$
  ])
  .pipe(
    map(([products, selectedCategoryId]) =>
    products.filter(product => selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  categories$ = this.productCategoryService.productCategories$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // productsSimpleFilter$ = this.productService.productWithCategory$
  // .pipe(
  //   map(products => products.filter(product => this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true))
  // );

  constructor(private productService: ProductService,
   private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    // this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId);
  }
}
