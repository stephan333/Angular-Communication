import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  listFilter: string;
  showImage: boolean;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  @ViewChild('filterElement') filterElementRef: ElementRef;
  private _filterInput: NgModel;
  private _sub: Subscription;

  public get filterInput(): NgModel {
    return this._filterInput;
  }

  @ViewChild(NgModel)
  public set filterInput(value: NgModel) {
    this._filterInput = value;

    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }

    if (this.filterInput && !this._sub) {
      this._sub = this.filterInput.valueChanges.subscribe(() =>
        this.performFilter(this.listFilter)
      );
    }

    console.log('this._sub: ', this._sub);
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  ngAfterViewInit(): void {}

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
}
