import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  private baseUrl = 'http://localhost:65410/Investments';

  constructor(private http: HttpClient, public datepipe: DatePipe) {

  }

  portfolioData(portfolioID: number, groupTransactions: boolean, fromDate: Date, toDate: Date) {
    let fdate =this.datepipe.transform(fromDate, 'MM/dd/yyyy');
    let tdate =this.datepipe.transform(toDate, 'MM/dd/yyyy');
    return this.http.get(this.baseUrl + "/PortfolioData?portfolioID=" + portfolioID + "&groupTransactions=" + groupTransactions + "&fromDate="+fdate + "&toDate="+tdate);
  }

  getFundsDailyTrack(portfolioID: number, fromDate: Date, toDate: Date) {
    let fdate =this.datepipe.transform(fromDate, 'MM/dd/yyyy');
    let tdate =this.datepipe.transform(toDate, 'MM/dd/yyyy');
    return this.http.get(this.baseUrl + "/FundsDailyTrack?portfolioID=" + portfolioID + "&fromDate="+fdate + "&toDate="+tdate);
  }

  public goalsInfo(portfolioID: number, fromDate: Date, toDate: Date) {
    let fdate =this.datepipe.transform(fromDate, 'MM/dd/yyyy');
    let tdate =this.datepipe.transform(toDate, 'MM/dd/yyyy');
    return this.http.get(this.baseUrl + "/GoalsInfo?portfolioID=" + portfolioID + "&fromDate="+fdate + "&toDate="+tdate);
  }

  public downloadFundsNAV() {
    return this.http.get(this.baseUrl + "/DownloadFundsNAV");
  }

  public nAVDownloadDetails() {
    return this.http.get(this.baseUrl + '/NAVDownloadDetails');
  }

  goalAllocations() {
    return this.http.get(this.baseUrl + "/GoalAllocations");
  }

  goals() {
    return this.http.get(this.baseUrl + "/Goals");
  }

  getCurrentMonthTracker(portfolioID: number, date: Date) {
    let fdate =this.datepipe.transform(date, 'MM/dd/yyyy');
    return this.http.get(this.baseUrl + "/CurrentMonthTracker?date=" + fdate + "&portfolioID=" + portfolioID);
  }

}
