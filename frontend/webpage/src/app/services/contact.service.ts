import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {HttpClient} from '@angular/common/http';
import {Result} from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public sendMessage(message: string): Promise<Result> {
    /*console.log('ContactService.sendMessage(');
    console.log(message);
    console.log(')');*/
    return this.httpClient
      .post<Result>(this.baseUrl + '/messages', message, {responseType: 'json'})
      .toPromise()
      .catch(reason => {
        console.log('ERR: ' + JSON.stringify(reason));
        return Promise.resolve(new Result(false));
      });
  }
}
