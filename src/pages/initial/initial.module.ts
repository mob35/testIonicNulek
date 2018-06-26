import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitialPage } from './initial';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    InitialPage,
  ],
  imports: [
    IonicPageModule.forChild(InitialPage),
    ComponentsModule
  ],
})
export class InitialPageModule {}
