import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Product } from '../product';
 
@Component({
    templateUrl: './fetch-data-detail.component.html',
    providers: [DataService]
})
export class FetchDataDetailComponent implements OnInit {
 
    id: string;
    product: Product;
    loaded: boolean = false;
 
    constructor(private dataService: DataService, activeRoute: ActivatedRoute) {
        this.id = activeRoute.snapshot.params["id"];
    }
 
    ngOnInit() {
        if (this.id)
            this.dataService.getProduct(this.id)
                .subscribe((data: Product) => { this.product = data; this.loaded = true; });
    }
}