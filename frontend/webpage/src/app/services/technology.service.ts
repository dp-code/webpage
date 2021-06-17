import {Injectable} from '@angular/core';
import {Technology} from '../models/technology';
import {HttpClient} from '@angular/common/http';
import {LocalizationService} from './localization.service';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService extends BaseService{
  constructor(private httpClient: HttpClient, private localizationService: LocalizationService) {
    super();
  }

  public getTechnologies(): Promise<Technology[]> {
    /*console.log('TechnologyService.getTechnologies()');*/
    const locale = this.localizationService.getLocale();
    return this.httpClient
      .get<Technology[]>(this.baseUrl + '/json/list/' + locale + '/technologies', {responseType: 'json'})
      .toPromise();
  }
}
