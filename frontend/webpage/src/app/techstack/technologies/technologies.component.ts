import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Technology} from '../../models/technology';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {TechnologyService} from '../../services/technology.service';
import {Language} from '../../models/language';
import {Subscription, timer} from 'rxjs';
import {BaseComponent} from '../../base.component';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() language: Language | undefined;
  @Input() category: Category | undefined;
  @Input() direction: string | undefined;
  categories: Category[] | undefined;
  technologies: Technology[] | undefined;
  subscription: Subscription | undefined;

  constructor(
    private localizationService: LocalizationService,
    private categoryService: CategoryService,
    private technologyService: TechnologyService
  ) {
    super(localizationService);
  }

  ngOnInit(): void {
    this.categoryService.getCategories().then(categories => {
      this.categories = categories;
    });
    this.technologyService.getTechnologies().then(technologies => this.technologies = technologies);
  }

  getTechnologies(): Technology[] {
    const technologies = this.technologies ?? [];
    return technologies.filter(this.filterPredicate()).sort(this.sortPredicate());
  }

  private filterPredicate(): (o: Technology) => boolean {
    return (o: Technology) => {
      if (this.language) {
        return this.language.filter.includes(o.language);
      } else {
        return true;
      }
    };
  }

  private sortPredicate(): (o1: Technology, o2: Technology) => number {
    return (o1, o2) => {
      const index: keyof Technology = this.category?.name ?? 'technology';
      const v1 = o1[index];
      const v2 = o2[index];
      if (typeof v1 === 'number' && typeof v2 === 'number') {
        return (v1 - v2) * (this.direction === 'dsc' ? 1 : -1);
      } else {
        return v1.toString().localeCompare(v2.toString()) * (this.direction === 'dsc' ? 1 : -1);
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.technologies = [];
    const delayedTimer = timer(50);
    this.subscription = delayedTimer.subscribe(ticks => this.onTimer(ticks));
  }

  public onTimer(ticks: number): void {
    this.technologyService.getTechnologies().then(technologies => this.technologies = technologies);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
