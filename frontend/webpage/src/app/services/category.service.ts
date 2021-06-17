import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {LocalizationService} from './localization.service';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  cacheLocale: string | undefined;
  cache: Category[] | undefined;

  constructor(private httpClient: HttpClient, private localizationService: LocalizationService) {
    super();
  }

  public getCategories(): Promise<Category[]> {
    /*console.log('CategoryService.getCategories()');*/
    const locale = this.localizationService.getLocale();
    if (this.cacheLocale && this.cacheLocale === locale && this.cache) {
      return Promise.all(this.cache);
    } else {
      return this.httpClient
        .get<Category[]>(this.baseUrl + '/json/list/' + locale + '/categories', {responseType: 'json'})
        .toPromise()
        .then(categories => {
          this.cache = categories;
          this.cacheLocale = locale;
          return categories;
        });
    }
  }
}
