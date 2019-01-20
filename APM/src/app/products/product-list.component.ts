import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';

  public get showImage(): boolean {
    return this.productParameterService.showImage;
  }

  public set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  includeDetail: boolean = true;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  @ViewChild(NgModel) filterInput: NgModel;
  // @ViewChild('filterCriteria') filterComponent: CriteriaComponent;
  // @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string;

  filteredProducts: IProduct[];
  products: IProduct[];
  listFilter: string;
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParameterService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  onFilterChange(message: string) {
    this.performFilter(message);
    this.listFilter = message;
  }

  onValueChange(value: string) {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }
}
