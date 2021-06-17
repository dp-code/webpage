import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {BaseComponent} from '../../base.component';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent extends BaseComponent implements OnInit {
  @Output() categoryEventEmitter = new EventEmitter<Category>();
  @Output() directionEventEmitter = new EventEmitter<string>();
  @Input() category: Category | undefined;
  @Input() direction: string | undefined;
  categories: Category[] | undefined;

  constructor(
    private localizationService: LocalizationService,
    private categoryService: CategoryService
  ) {
    super(localizationService);
  }

  ngOnInit(): void {
    this.categoryService.getCategories().then(categories => this.categories = categories);
  }

  setCategory(category: Category): void {
    this.category = category;
    this.categoryEventEmitter.emit(category);
    this.direction = category.defaultDirection;
    this.directionEventEmitter.emit(this.direction);
  }

  setDirection(direction: string): void {
    this.direction = direction;
    this.directionEventEmitter.emit(this.direction);
  }
}
