import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class HomeService {
  private baseUrl = 'http://localhost:18361/Home';
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  public getHomeTransactions(fromDate: Date, toDate: Date) {
    let fdate =this.datepipe.transform(fromDate, 'MM/dd/yyyy');
    let tdate =this.datepipe.transform(toDate, 'MM/dd/yyyy');
    return this.http.get(this.baseUrl + "/GetTransactions?fromDate=" + fdate + "&toDate=" + tdate);
  }
}
