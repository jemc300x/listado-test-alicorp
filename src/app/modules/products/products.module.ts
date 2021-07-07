import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './page/list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';


@NgModule({
  declarations: [
    ListComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
