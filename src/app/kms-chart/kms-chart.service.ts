import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IKMSChart, IQuote} from '../models/chart-model';

@Injectable({
  providedIn: 'root'
})
export class KmsChartService {

  constructor(private http: HttpClient) {
  }

  getKmsChartData(): Observable<IQuote[][]> {
    return this.http.get<IKMSChart>('assets/mock/quotes.json').pipe(
      map((data) => data.quotes)
    );
  }


}
