import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {Language} from '../../models/language';
import {LanguageService} from '../../services/language.service';
import {BaseComponent} from '../../base.component';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-techstack',
  templateUrl: './techstack.component.html',
  styleUrls: ['./techstack.component.css']
})
export class TechstackComponent extends BaseComponent implements OnInit {
  language: Language | undefined;
  sortCategory: Category | undefined;
  sortDirection: string | undefined;

  constructor(
    private localizationService: LocalizationService,
    private categoryService: CategoryService,
    private languageService: LanguageService
  ) {
    super(localizationService);
  }

  ngOnInit(): void {
    this.languageService.getLanguages().then(languages => this.language = languages[0]);
    this.categoryService.getCategories().then(categories => {
      this.sortCategory = categories[3];
      this.sortDirection = this.sortCategory.defaultDirection;
    });
  }

  getLanguageText(): string{
    if (this.language) { return this.language.text; }
    else { return ''; }
  }

  public onCategoryChanged(event: Category): void {
    this.sortCategory = event;
  }

  public onDirectionChanged(event: string): void {
    this.sortDirection = event;
  }

  public onLanguageChanged(event: Language): void {
    this.language = event;
  }
}
