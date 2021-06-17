import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalizationService} from './localization.service';
import {Technology} from '../models/technology';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class HtmlService extends BaseService {
  endpointUrl = '/html';

  constructor(private httpClient: HttpClient, private localizationService: LocalizationService) {
    super();
  }

  public getHtml(key: string): Promise<string> {
/*    console.log('HtmlService.getHtml(');
    console.log(key);
    console.log(')');*/
    const locale = this.localizationService.getLocale();
    return this.httpClient
      .get(this.baseUrl + this.endpointUrl + '/' + locale + '/' + key, {responseType: 'text'})
      .toPromise()
      .catch(reason => {
        console.log('ERR: ' + JSON.stringify(reason));
        return '#Localization error';
      });
  }
}
