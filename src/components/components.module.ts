import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PinComponent } from './pin/pin';
import { MessageComponent } from './message/message';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [PinComponent,
    MessageComponent],
	imports: [CommonModule,IonicModule],
	exports: [PinComponent,
    MessageComponent]
})
export class ComponentsModule {}
