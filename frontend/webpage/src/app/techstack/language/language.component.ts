import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../models/language';
import {BaseComponent} from '../../base.component';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent extends BaseComponent implements OnInit {
  @Output() languageEventEmitter = new EventEmitter<Language>();
  @Input() language: Language | undefined;
  languages: Language[] | undefined;

  constructor(
    private localizationService: LocalizationService,
    private languageService: LanguageService
  ) {
    super(localizationService);
  }

  ngOnInit(): void {
    this.languageService.getLanguages().then(languages => this.languages = languages);
  }

  getButtonStyle(language: Language): string {
    return language.name === this.language?.name ? ' btn-warning' : 'btn-light';
  }

  setLanguage(language: Language): void {
    this.language = language;
    this.languageEventEmitter.emit(this.language);
  }
}
