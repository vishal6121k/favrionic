import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgComponent } from './svg/svg.component';
import { RouterModule } from '@angular/router';
import { LoccarttComponent } from './loccartt/loccartt.component';
import { LoccartComponent } from './loccart/loccart.component';


@NgModule({
  declarations: [SvgComponent, LoccartComponent, LoccarttComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SvgComponent, LoccartComponent, LoccarttComponent]
})
export class IconModule { }
