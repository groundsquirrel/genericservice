import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Vagon as Vagon } from '../vagon';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http/http';
 
@Component({
    templateUrl: './vagon-edit.component.html',
    styleUrls: ['vagon-edit.component.css'],
    providers: [DataService]
})
export class VagonEditComponent implements OnInit {
 
    id: string;
    vagon: Vagon;
    loaded: boolean = false;

    vagon_form: FormGroup;
  
    number = new FormControl(null, Validators.required);
    model = new FormControl(null, Validators.required);
    countryOwner = new FormControl(null, Validators.required);
    vagonType = new FormControl(null, [Validators.required]);
    rentalEndDate = new FormControl(new Date(), Validators.required);
    isClosedFloor = new FormControl();
    capacity = new FormControl(0, [Validators.required, Validators.min(0)]);
    tare = new FormControl(0, [Validators.required, Validators.min(0)]);
    ownType = new FormControl(null, [Validators.required]);
    axlesCount = new FormControl(0, [Validators.required, Validators.min(0)]);
    volume = new FormControl(0, [Validators.required, Validators.min(0)]);
    length = new FormControl(0, [Validators.required, Validators.min(0)]);
    ownerName = new FormControl(null, Validators.required);
    tenantName = new FormControl();
    operatorName = new FormControl();
    mileage = new FormControl(0, [Validators.required, Validators.min(0)]);
    productionYear = new FormControl(0, [Validators.required, Validators.min(0)]);
    lastRepairDate = new FormControl(new Date(), Validators.required);
    nextRepairDate = new FormControl(new Date(), Validators.required);
    imgUrl = new FormControl();

    minDate: Date;
    maxDate: Date;

    constructor(private dataService: DataService, activeRoute: ActivatedRoute) {
        this.id = activeRoute.snapshot.params["id"];
        this.buildForm();
    }
 
    ngOnInit() {
        if (this.id)
            this.dataService.getVagon(this.id)
                .subscribe((data: Vagon) => { 
                    this.vagon = Vagon.fromVagon(data); 
                    this.loaded = true; 
                });
    }

    private buildForm() {
        this.vagon_form = new FormBuilder().group({
          number: this.number,
          model: this.model,
          countryOwner: this.countryOwner,
          vagonType: this.vagonType,
          rentalEndDate: this.rentalEndDate,
          isClosedFloor: this.isClosedFloor,
          capacity: this.capacity,
          tare: this.tare,
          ownType: this.ownType,
          axlesCount: this.axlesCount,
          volume: this.volume,
          length: this.length,
          ownerName: this.ownerName,
          tenantName: this.tenantName,
          operatorName: this.operatorName,
          mileage: this.mileage,
          productionYear: this.productionYear,
          lastRepairDate: this.lastRepairDate,
          nextRepairDate: this.nextRepairDate,
          imgUrl: this.imgUrl
        });
    }

    // сохранение данных
    save() {
        if (this.vagon_form.value._id == null) {
            this.dataService.createVagon(this.vagon_form.value)
                .subscribe((data: HttpResponse<Vagon>) => {
                console.debug(data);
                
                });
        } else {
            this.dataService.updateVagon(this.vagon);
                //.subscribe(() => this.loadVagons());
        }
        //this.cancel();
    }

    editVagon(p: Vagon) {
        this.vagon = p;
    }

    cancel() {
        this.vagon = new Vagon();
        this.vagon_form.reset();
        // this.tableMode = true;
        // this.sort = this.dataSource.sort;
        // this.loadVagons();
        
    }
}