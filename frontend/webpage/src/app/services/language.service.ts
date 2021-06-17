import {Injectable} from '@angular/core';
import {Language} from '../models/language';
import {Locale} from '../models/locale';
import {HttpClient} from '@angular/common/http';
import {LocalizationService} from './localization.service';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService {
  constructor(private httpClient: HttpClient, private localizationService: LocalizationService) {
    super();
  }

  public getLanguages(): Promise<Language[]> {
    /*console.log('LanguageService.getLanguages()');*/
    const locale = this.localizationService.getLocale();
    return this.httpClient
      .get<Language[]>(this.baseUrl + '/json/list/' + locale + '/languages', {responseType: 'json'})
      .toPromise();
  }
}
