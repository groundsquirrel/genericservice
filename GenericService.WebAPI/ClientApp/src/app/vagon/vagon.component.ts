import { Component, ViewChild,  OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

import { DataService } from './data.service';
import { Vagon as Vagon } from './vagon';

@Component({
  selector: 'app-vagon',
  styleUrls: ['vagon.component.css'],
  templateUrl: './vagon.component.html',
  providers: [DataService]
})
export class VagonComponent implements OnInit {
  color: string = 'primary';

  loaded: boolean = false;

  displayedColumns: string[] = ['number', 'model', 'countryOwner', 'vagonType', 'isClosedFloor', 'rentalEndDate', 'capacity', 'tare', 'ownType', 'axlesCount', 'volume', 'createdAt', 'updatedAt', 'actions'];
  dataSource: MatTableDataSource<Vagon>; // массив товаров

  constructor(private dataService: DataService) {
    
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
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
              this.loaded = true; 
          }, error => console.error(error));
  }
 
  delete(p: Vagon) {
      this.dataService.deleteVagon(p._id)
          .subscribe(() => this.loadVagons());
  }
}