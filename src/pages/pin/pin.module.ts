import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinPage } from './pin';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PinPage,
  ],
  imports: [
    IonicPageModule.forChild(PinPage),
    ComponentsModule
  ],
})
export class PinPageModule {}
