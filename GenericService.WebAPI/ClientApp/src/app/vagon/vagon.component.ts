import { Component, ViewChild,  OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { DataService } from './data.service';
import { Vagon as Vagon } from './vagon';

import { HttpResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-vagon',
  styleUrls: ['vagon.component.css'],
  templateUrl: './vagon.component.html',
  providers: [DataService]
})
export class VagonComponent implements OnInit {
  vagon_form: FormGroup;
    
  model = new FormControl(null, Validators.required);
  countryOwner = new FormControl(null, Validators.required);
  vagonType = new FormControl(null, [Validators.required]);
  rentalEndDate = new FormControl(new Date(), Validators.required);
  isClosedFloor = new FormControl();
  capacityControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  tareControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  ownType = new FormControl(null, [Validators.required]);
  axlesCountControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  volumeControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  lengthControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  ownerName = new FormControl(null, Validators.required);
  tenantName = new FormControl();
  operatorName = new FormControl();
  mileageControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  productionYearControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  lastRepairDate = new FormControl(new Date(), Validators.required);
  nextRepairDate = new FormControl(new Date(), Validators.required);
  imgUrl = new FormControl();

  minDate: Date;
  maxDate: Date;

  vagon: Vagon = new Vagon();   // изменяемый объект
  tableMode: boolean = true;          // табличный режим

  displayedColumns: string[] = ['name', 'company', 'screenType', 'os', 'deliveryDate', 'isNfc', 'price', 'createdAt'];
  dataSource: MatTableDataSource<Vagon>; // массив товаров

  constructor(private dataService: DataService, fb: FormBuilder) {
    this.buildForm(fb);
    //this.minDate = this.addDays(new Date(), -7);
    //this.maxDate = this.addDays(new Date(), 7);
   }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  private buildForm(fb: FormBuilder) {
    this.vagon_form = fb.group({
      model: this.model,
      countryOwner: this.countryOwner,
      vagonType: this.vagonType,
      rentalEndDate: this.rentalEndDate,
      isClosedFloor: this.isClosedFloor,
      capacityControl: this.capacityControl,
      tareControl: this.tareControl,
      ownType: this.ownType,
      axlesCountControl: this.axlesCountControl,
      volumeControl: this.volumeControl,
      lengthControl: this.lengthControl,
      ownerName: this.ownerName,
      tenantName: this.tenantName,
      operatorName: this.operatorName,
      mileageControl: this.mileageControl,
      productionYearControl: this.productionYearControl,
      lastRepairDate: this.lastRepairDate,
      nextRepairDate: this.nextRepairDate,
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
    this.loadVagons();    // загрузка данных при старте компонента  
  }

  // получаем данные через сервис
  loadVagons() {
      this.dataService.getVagons()
          .subscribe((data: Vagon[]) => {
              let temp = data.map(m => Vagon.fromVagon(m));
              this.dataSource = new MatTableDataSource(temp);
              this.dataSource.sort = this.sort; 
              this.dataSource.paginator = this.paginator;
          }, error => console.error(error));
  }
  // сохранение данных
  save() {
      if (this.vagon_form.value._id == null) {
          this.dataService.createVagon(this.vagon_form.value)
              .subscribe((data: HttpResponse<Vagon>) => {
                console.debug(data);
                this.loadVagons();
              });
      } else {
          this.dataService.updateVagon(this.vagon)
              .subscribe(() => this.loadVagons());
      }
      this.cancel();
  }
  editVagon(p: Vagon) {
      this.vagon = p;
  }
  cancel() {
      this.vagon = new Vagon();
      this.vagon_form.reset();
      this.tableMode = true;
      this.sort = this.dataSource.sort;
      this.loadVagons();
      
  }
  delete(p: Vagon) {
      this.dataService.deleteVagon(p._id)
          .subscribe(() => this.loadVagons());
  }
  add() {
      this.cancel();
      this.tableMode = false;
  }

  submit() {
    console.log(this.vagon_form);
    if (this.vagon_form.status == 'VALID')
      this.save();
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}