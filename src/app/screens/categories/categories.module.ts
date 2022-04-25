import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoriesPageRoutingModule } from './categories-routing.module';
import { CategoriesPage } from './categories.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    TranslateModule,
    CategoriesPageRoutingModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule { }
