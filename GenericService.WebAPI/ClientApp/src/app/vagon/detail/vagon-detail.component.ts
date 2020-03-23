import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Vagon } from '../vagon';
 
@Component({
    templateUrl: './vagon-detail.component.html',
    styleUrls: ['vagon-detail.component.css'],
    providers: [DataService]
})
export class VagonDetailComponent implements OnInit {
    color: string = 'primary';

    id: string;
    vagon: Vagon;
    loaded: boolean = false;

    constructor(private dataService: DataService, activeRoute: ActivatedRoute) {
        this.id = activeRoute.snapshot.params["id"];
    }
 
    ngOnInit() {
        if (this.id)
            this.dataService.getVagon(this.id)
                .subscribe((data: Vagon) => { 
                    this.vagon = Vagon.fromVagon(data); 
                    this.loaded = true; 
                });
    }
}