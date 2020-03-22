import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Vagon } from '../vagon';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http/http';
 
@Component({
    templateUrl: './vagon-edit.component.html',
    styleUrls: ['vagon-edit.component.css'],
    providers: [DataService]
})
export class VagonEditComponent implements OnInit {
    color: string = 'primary';

    id: string;
    vagon: Vagon;
    loaded: boolean = false;

    vagon_form: FormGroup;
  
    _id = new FormControl();
    number = new FormControl(null, Validators.required);
    model = new FormControl(null, Validators.required);
    countryOwner = new FormControl(null, Validators.required);
    vagonType = new FormControl(null, [Validators.required]);
    rentalEndDate = new FormControl(new Date(), Validators.required);
    isClosedFloor = new FormControl();
    capacity = new FormControl(null, [Validators.required, Validators.min(0)]);
    tare = new FormControl(null, [Validators.required, Validators.min(0)]);
    ownType = new FormControl(null, [Validators.required]);
    axlesCount = new FormControl(null, [Validators.required, Validators.min(0)]);
    volume = new FormControl(null, [Validators.required, Validators.min(0)]);
    length = new FormControl(null, [Validators.required, Validators.min(0)]);
    ownerName = new FormControl(null, Validators.required);
    tenantName = new FormControl();
    operatorName = new FormControl();
    mileage = new FormControl(null, [Validators.required, Validators.min(0)]);
    productionYear = new FormControl(null, [Validators.required, Validators.min(0)]);
    lastRepairDate = new FormControl(new Date(), Validators.required);
    nextRepairDate = new FormControl(new Date(), Validators.required);
    imgUrl = new FormControl();
    createdAt = new FormControl(new Date(), Validators.required);
    updatedAt = new FormControl(new Date(), Validators.required);

    minDate: Date;
    maxDate: Date;

    constructor(private dataService: DataService, activeRoute: ActivatedRoute, private router: Router) {
        this.id = activeRoute.snapshot.params["id"];
        this.buildForm();
    }
 
    ngOnInit() {
        if (this.id !== 'new')
            this.dataService.getVagon(this.id)
                .subscribe((data: Vagon) => { 
                    this.vagon = Vagon.fromVagon(data); 
                    this._id.setValue(this.vagon._id);
                    this.number.setValue(this.vagon.number);
                    this.model.setValue(this.vagon.model);
                    this.countryOwner.setValue(this.vagon.countryOwner);
                    this.vagonType.setValue(this.vagon.vagonType);
                    this.rentalEndDate.setValue(this.vagon.rentalEndDate);
                    this.isClosedFloor.setValue(this.vagon.isClosedFloor);
                    this.capacity.setValue(this.vagon.capacity);
                    this.tare.setValue(this.vagon.tare);
                    this.ownType.setValue(this.vagon.ownType);
                    this.axlesCount.setValue(this.vagon.axlesCount);
                    this.volume.setValue(this.vagon.volume);
                    this.length.setValue(this.vagon.length);
                    this.ownerName.setValue(this.vagon.ownerName);
                    this.tenantName.setValue(this.vagon.tenantName);
                    this.operatorName.setValue(this.vagon.operatorName);
                    this.mileage.setValue(this.vagon.mileage);
                    this.productionYear.setValue(this.vagon.productionYear);
                    this.lastRepairDate.setValue(this.vagon.lastRepairDate);
                    this.nextRepairDate.setValue(this.vagon.nextRepairDate);
                    this.imgUrl.setValue(this.vagon.imgUrl);
                    this.createdAt.setValue(this.vagon.createdAt);
                    this.updatedAt.setValue(this.vagon.updatedAt);

                    this.loaded = true;
                });
        else {
            this.vagon = new Vagon();
            this.loaded = true;
        }
    }

    private buildForm() {
        this.vagon_form = new FormBuilder().group({
          _id: this._id,
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
          imgUrl: this.imgUrl,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        });
    }

    // сохранение данных
    save() {
        if (this.vagon_form.value._id === null) {
            this.dataService.createVagon(this.vagon_form.value)
                .subscribe((data: HttpResponse<Vagon>) => {
                    this.router.navigate(['/vagon']);
                });
        } else {
            this.dataService.updateVagon(this.vagon_form.value)
                .subscribe(() => this.router.navigate(['/vagon']));
        }
    }

    submit() {
        if (this.vagon_form.status === 'VALID')
          this.save();
      }
}