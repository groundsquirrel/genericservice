import { Component, ViewChild,  OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { DataService } from './data.service';
import { Product as Product, ProductExt } from './product';
import * as moment from 'moment';

import { HttpResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-fetch-data',
  styleUrls: ['fetch-data.component.css'],
  templateUrl: './fetch-data.component.html',
  providers: [DataService]
})
export class FetchDataComponent implements OnInit {
  product_form: FormGroup;
  productExt: ProductExt;
  
  name = new FormControl(null, Validators.required);
  company = new FormControl(null, Validators.required);
  screenType = new FormControl(0, [Validators.min(1), Validators.max(3)]);
  os = new FormControl(0, [Validators.min(1), Validators.max(3)]);
  deliveryDate = new FormControl(new Date(), Validators.required);
  isNfc = new FormControl();
  price = new FormControl(0, Validators.min(1));
  imgUrl = new FormControl(null, Validators.required);

  minDate: Date;
  maxDate: Date;

  product: Product = new Product();   // изменяемый товар
  tableMode: boolean = true;          // табличный режим

  displayedColumns: string[] = ['name', 'company', 'screenType', 'os', 'deliveryDate', 'isNfc', 'price', 'createdAt'];
  dataSource: MatTableDataSource<Product>; // массив товаров

  osList: simpleObj[] = [
    {value: 0, viewValue: 'Не выбрано'},
    {value: 1, viewValue: 'Android'},
    {value: 2, viewValue: 'IOS'},
    {value: 3, viewValue: 'Другое'}
  ];

screenTypes: simpleObj[] = [
    {value: 0, viewValue: 'Не выбрано'},
    {value: 1, viewValue: 'AMOLED'},
    {value: 2, viewValue: 'IPS'},
    {value: 3, viewValue: 'TFT'},
];

  constructor(private dataService: DataService, fb: FormBuilder) {
    this.buildForm(fb);
    this.minDate = this.addDays(new Date(), -7);
    this.maxDate = this.addDays(new Date(), 7);
   }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  private buildForm(fb: FormBuilder) {
    this.product_form = fb.group({
      name: this.name,
      company: this.company,
      screenType: this.screenType,
      os: this.os,
      deliveryDate: this.deliveryDate,
      isNfc: this.isNfc,
      price: this.price,
      imgUrl: this.imgUrl
    });
  }

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
      console.info('loadProducts()');
      this.dataService.getProducts()
          .subscribe((data: Product[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort; 
            this.dataSource.paginator = this.paginator;
          }, error => console.error(error));
  }
  // сохранение данных
  save() {
      if (this.product_form.value._id == null) {
          this.dataService.createProduct(this.product_form.value)
              .subscribe((data: HttpResponse<Product>) => {
                console.debug(data);
                //this.products.push(data);
                this.loadProducts();
              });
      } else {
          this.dataService.updateProduct(this.product)
              .subscribe(() => this.loadProducts());
      }
      this.cancel();
  }
  editProduct(p: Product) {
      this.product = p;
  }
  cancel() {
      this.product = new Product();
      this.product_form.reset();
      this.tableMode = true;
      this.sort = this.dataSource.sort;
      this.loadProducts();
      
  }
  delete(p: Product) {
      this.dataService.deleteProduct(p._id)
          .subscribe(() => this.loadProducts());
  }
  add() {
      this.cancel();
      this.tableMode = false;
  }

  

  submit() {
    console.log(this.product_form);
    if (this.product_form.status == 'VALID')
      this.save();
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}


export interface simpleObj {
  value: number;
  viewValue: string;
}