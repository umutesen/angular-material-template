import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerRoutingModule } from './broker-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrokerListComponent } from './broker-list/broker-list.component';

@NgModule({
    imports: [
        CommonModule,
        BrokerRoutingModule,
        SharedModule
    ],
    declarations: [
        BrokerListComponent
    ]
})
export class BrokersModule { }
