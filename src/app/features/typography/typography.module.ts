import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypographyRoutingModule } from './typography-routing.module';
import { TypographyComponent } from './typography/typography.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TypographyComponent],
  imports: [
    CommonModule,
    SharedModule,
    TypographyRoutingModule
  ]
})
export class TypographyModule { }
