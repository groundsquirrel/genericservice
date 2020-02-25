import { Component, ViewChild,  OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from './data.service';
import { Product as Product } from './product';
import * as moment from 'moment';

import { HttpResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-fetch-data',
  styleUrls: ['fetch-data.component.css'],
  templateUrl: './fetch-data.component.html',
  providers: [DataService]
})
export class FetchDataComponent implements OnInit {
  
  product: Product = new Product();   // изменяемый товар
  tableMode: boolean = true;          // табличный режим

  displayedColumns: string[] = ['name', 'company', 'screenType', 'os', 'deliveryDate', 'isNfc', 'price'];
  dataSource: MatTableDataSource<Product>; // массив товаров

  osList: simpleObj[] = [
    {value: 0, viewValue: 'Android'},
    {value: 1, viewValue: 'IOS'},
    {value: 2, viewValue: 'Другое'}
  ];

  screenTypes: simpleObj[] = [
    {value: 0, viewValue: 'TFT'},
    {value: 1, viewValue: 'OLED'},
    {value: 2, viewValue: 'IPS'}
  ];

  constructor(private dataService: DataService) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    console.info('ngOnInit');
    this.loadProducts();    // загрузка данных при старте компонента  
  }

  // получаем данные через сервис
  loadProducts() {
      //console.info('loadProducts()');
      this.dataService.getProducts()
          .subscribe((data: Product[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort; 
            this.dataSource.paginator = this.paginator;
          }, error => console.error(error));
  }
  // сохранение данных
  save() {
      if (this.product._id == null) {
          this.dataService.createProduct(this.product)
              .subscribe((data: HttpResponse<Product>) => {
                console.debug(data);
                //this.products.push(data);
                this.loadProducts();
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
      this.sort = this.dataSource.sort;
      this.loadProducts();
      
  }
  delete(p: Product) {
      this.dataService.deleteProduct(p._id)
          .subscribe(data => this.loadProducts());
  }
  add() {
      this.cancel();
      this.tableMode = false;
  }

  getScreenTypeName(i: number): string {
    return this.getFirstName(this.screenTypes, i);
  }

  getOsName(i: number): string {
    return this.getFirstName(this.osList, i);
  }

  getFirstName(arr: simpleObj[], i: number): string {
    let filtered = arr.filter(f => f.value == i);
    return filtered.length > 0 ? filtered[0].viewValue : null;
  }

  getBoolIconName(b: boolean): string {
    return b ? 'done' : '';
  }

   getFormattedDate(d: Date): string {
     return moment(d).format('DD.MM.YYYY');
   }
}


export interface simpleObj {
  value: number;
  viewValue: string;
}