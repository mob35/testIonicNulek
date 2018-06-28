import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PinComponent } from './pin/pin';
import { MessageComponent } from './message/message';
@NgModule({
	declarations: [PinComponent,
    MessageComponent],
	imports: [IonicModule],
	exports: [PinComponent,
    MessageComponent]
})
export class ComponentsModule {}
