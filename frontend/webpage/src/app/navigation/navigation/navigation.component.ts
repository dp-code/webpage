import {Component, OnInit} from '@angular/core';
import {Locale} from '../../models/locale';
import {Navlink} from '../../models/navlink';
import {BaseComponent} from '../../base.component';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent extends BaseComponent implements OnInit {
  navlinks = [
    new Navlink('about', 'navlink-about', '/'),
    new Navlink('techstack', 'navlink-techstack', '/techstack'),
    new Navlink('contact', 'navlink-contact', '/contact'),
  ];
  locales: Locale[] | undefined;
  locale: Locale | undefined;

  constructor(
    private localizationService: LocalizationService
  ) {
    super(localizationService);
  }

  ngOnInit(): void {
    const locale = this.localizationService.getLocale();
    this.localizationService.getLocales().then(v => {
      this.locales = v;
      this.locale = this.locales.find(u => u.name === locale);
    });
    this.navlinks.forEach(v => {
      this.localize(v.text).then(u => v.text = u);
    });
  }

  setLocale(locale: Locale): void {
    this.locale = locale;
    this.localizationService.setLocale(this.locale);
    window.location.reload();
  }
}
