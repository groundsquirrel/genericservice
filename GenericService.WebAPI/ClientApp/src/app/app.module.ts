import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, MatSortModule, MatPaginatorModule, MatIconModule, MatCardModule, MatPaginatorIntl, MatMenuModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list'; 

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchDataDetailComponent } from './fetch-data/detail/fetch-data-detail.component';
import { ProductComponent } from './product/product.component';
import { TableSortingExample } from './table-sorting-example/table-sorting-example';
import { VagonComponent } from './vagon/vagon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getRussianPaginatorIntl } from './russian-paginator-intl';
import { VagonDetailComponent } from './vagon/detail/vagon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FetchDataDetailComponent,
    ProductComponent,
    TableSortingExample,
    VagonComponent,
    VagonDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule, 
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'fetch-data/:id', component: FetchDataDetailComponent },
      { path: 'product', component: ProductComponent },
      { path: 'table-sorting-example', component: TableSortingExample },
      { path: 'vagon', component: VagonComponent },
      { path: 'vagon/:id', component: VagonDetailComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    { provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl() },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
