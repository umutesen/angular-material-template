import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsRoutingModule } from './icons-routing.module';
import { IconsComponent } from './icons/icons.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    SharedModule,
    IconsRoutingModule
  ]
})
export class IconsModule { }
