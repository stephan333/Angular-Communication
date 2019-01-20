import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';

  product: IProduct | null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.selectedProductChanges$.subscribe(
      selectedProduct => (this.product = selectedProduct)
    );
  }
}
