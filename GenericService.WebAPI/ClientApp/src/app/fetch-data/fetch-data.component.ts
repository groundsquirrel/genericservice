import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
//import { MatButtonModule } from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card';
import { DataService } from './data.service';
import { Product as Product } from './product';
 
@Component({
  selector: 'app-fetch-data',
  styleUrls: ['fetch-data.component.css'],
  templateUrl: './fetch-data.component.html',
  providers: [DataService]
})
export class FetchDataComponent implements OnInit {
 
  product: Product = new Product();   // изменяемый товар
  products: Product[];                // массив товаров
  tableMode: boolean = true;          // табличный режим

  displayedColumns: string[] = ['name', 'company', 'price'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  constructor(private dataService: DataService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
      this.loadProducts();    // загрузка данных при старте компонента  
  }
  // получаем данные через сервис
  loadProducts() {
      this.dataService.getProducts()
          .subscribe((data: Product[]) => {
            this.products = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, error => console.error(error));
  }
  // сохранение данных
  save() {
      if (this.product._id == null) {
          this.dataService.createProduct(this.product)
              .subscribe((data: Product) => {
                this.products.push(data);
                this.loadProducts()
              });
      } else {
          this.dataService.updateProduct(this.product)
              .subscribe(data => this.loadProducts());
      }
      this.cancel();
  }
  editProduct(p: Product) {
      this.product = p;
  }
  cancel() {
      this.product = new Product();
      this.tableMode = true;
  }
  delete(p: Product) {
      this.dataService.deleteProduct(p._id)
          .subscribe(data => this.loadProducts());
  }
  add() {
      this.cancel();
      this.tableMode = false;
  }
}