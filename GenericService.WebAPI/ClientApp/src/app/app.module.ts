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
import { TaskComponent } from './task/task.component';
import { VagonComponent } from './vagon/vagon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getRussianPaginatorIntl } from './russian-paginator-intl';
import { VagonDetailComponent } from './vagon/detail/vagon-detail.component';
import { VagonEditComponent } from './vagon/edit/vagon-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TaskComponent,
    VagonComponent,
    VagonDetailComponent,
    VagonEditComponent
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
      { path: '', component: TaskComponent, pathMatch: 'full' },
      { path: 'vagon', component: VagonComponent },
      { path: 'vagon/:id', component: VagonDetailComponent },
      { path: 'vagon/edit/:id', component: VagonEditComponent },
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
