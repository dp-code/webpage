import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Locale} from '../models/locale';
import {Category} from '../models/category';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService extends BaseService {
  endpointUrl = '/localization';
  cacheLocale: string | undefined;
  cache = new Map<string, string>();

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getLocale(): string {
    /*console.log('LocalizationService.getLocale()');*/
    const locale = localStorage.getItem('locale');
    return locale == null ? 'de' : locale;
  }

  public setLocale(locale: Locale): void {
    /*console.log('LocalizationService.setLocale(');
    console.log(JSON.stringify(locale));
    console.log(')');*/
    localStorage.setItem('locale', locale.name);
  }

  public getLocales(): Promise<Locale[]> {
    /*console.log('LocalizationService.getLocales()');*/
    return this.httpClient
      .get<Locale[]>(this.baseUrl + this.endpointUrl + '/locale-info/' + this.getLocale(), {responseType: 'json'})
      .toPromise();
  }

  public getLocalizedStringFromServer(key: string): Promise<string> {
    /*console.log('LocalizationService.getLocalizedStringFromServer(');
    console.log(key);
    console.log(')');*/
    const locale = this.getLocale();
    if (this.cacheLocale && this.cacheLocale !== locale) {
      this.cache.clear();
    }
    if (this.cacheLocale && this.cacheLocale === locale && this.cache.has(key)) {
      return Promise.resolve(this.cache.get(key) as string);
    } else {
      return this.httpClient
        .get(this.baseUrl + this.endpointUrl + '/localize/' + this.getLocale() + '/' + key, {responseType: 'text'})
        .toPromise()
        .then(value => {
          this.cache.set(key, value);
          this.cacheLocale = locale;
          return value;
        })
        .catch(reason => {
          console.log('ERR: ' + JSON.stringify(reason));
          return '#Localization error';
        });
    }
  }
}
