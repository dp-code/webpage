import {Component, Input, OnInit} from '@angular/core';
import {Technology} from '../../models/technology';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {BaseComponent} from '../../base.component';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent extends BaseComponent implements OnInit {
  @Input() technology: Technology | undefined;
  categories: Category[] | undefined;
  technologyDurationPlural: string | undefined;
  technologyDuration: string | undefined;
  technologyRecent: string | undefined;

  constructor(
    private localizationService: LocalizationService,
    private categoryService: CategoryService
  ) {
    super(localizationService);
  }

  ngOnInit(): void {
    this.localize('technology-duration-plural').then(value => this.technologyDurationPlural = value);
    this.localize('technology-duration').then(value => this.technologyDuration = value);
    this.localize('technology-recent').then(value => this.technologyRecent = value);
    this.categoryService.getCategories().then(categories => this.categories = categories);
  }

  getCategoryTitle(index: number): string {
    if (this.categories) {
      return this.categories[index].title;
    } else {
      return '';
    }
  }

  getDuration(value: number | undefined, useRecent: boolean): string {
    if (value === undefined) {
      return '';
    } else {
      const durationPlural = (this.technologyDurationPlural === undefined) ? '' : this.technologyDurationPlural;
      const duration = (this.technologyDuration === undefined) ? '' : this.technologyDuration;
      const recent = (this.technologyRecent === undefined) ? '' : this.technologyRecent;
      const years = Math.round(value / 12);
      if (useRecent) {
        if (years === 0) {
          return recent;
        } else if (years === 1) {
          return years.toString() + ' ' + duration;
        } else if (years > 5) {
          return '> 5 ' + durationPlural;
        } else {
          return years.toString() + ' ' + durationPlural;
        }
      } else {
        if (years === 0) {
          return '< 1 ' + duration;
        } else if (years === 1) {
          return years.toString() + ' ' + duration;
        } else if (years > 5) {
          return '> 5 ' + durationPlural;
        } else {
          return years.toString() + ' ' + durationPlural;
        }
      }
    }
  }
}
