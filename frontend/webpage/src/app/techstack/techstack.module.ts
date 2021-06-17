import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GaugeComponent} from './gauge/gauge.component';
import {TechstackComponent} from './techstack/techstack.component';
import { TechnologyComponent } from './technology/technology.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { SortingComponent } from './sorting/sorting.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LanguageComponent } from './language/language.component';


@NgModule({
  declarations: [GaugeComponent, TechstackComponent, TechnologyComponent, TechnologiesComponent, SortingComponent, LanguageComponent],
  exports: [TechstackComponent],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class TechstackModule {
}
