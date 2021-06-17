import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ImprintComponent } from './imprint/imprint.component';



@NgModule({
  declarations: [AboutComponent, ImprintComponent],
  imports: [
    CommonModule
  ]
})
export class AboutModule { }
