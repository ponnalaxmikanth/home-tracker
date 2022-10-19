import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StocksService {

  private baseUrl = 'http://localhost:65410/BSE';
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  getPerformance() {
    return this.http.get(this.baseUrl + "/GetPerformance");
  }

  // downloadIndices() {
  //   return this.http.get(this.baseUrl + "/DownloadIndices");
  // }

  downloadIndicesData(fromDate: Date, toDate: Date) {
    let fdate =this.datepipe.transform(fromDate, 'MM/dd/yyyy');
    let tdate =this.datepipe.transform(toDate, 'MM/dd/yyyy');
    return this.http.get(this.baseUrl + "/DownloadIndicesData?fromDate=" + fdate + "&toDate=" + tdate);

  }
}
