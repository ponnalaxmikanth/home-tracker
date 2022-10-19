import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MutualFundsService {

  private baseUrl = 'http://localhost:65410/Funds';
  public portfolioID = new BehaviorSubject<number>(-1);

  constructor(public datepipe: DatePipe, private http: HttpClient) { }

  getPortfolios() {
    return this.http.get(this.baseUrl + "/GetPortfolios");
  }

  getFolios() {
    return this.http.get(this.baseUrl + "/GetFundFolios");
  }

  getFundNAV(fundHouse: string, schemaCode: number, date: string | null) {
    return this.http.get(this.baseUrl + "/GetFundNAV?schemaCode=" + schemaCode + "&date=" + date + "&fundHouse=" + encodeURIComponent(fundHouse));
  }

  addFundTransaction(request: any) {
    return this.http.post(this.baseUrl + "/AddFundsTransaction", request);
  }

  getPerformance() {
    return this.http.get(this.baseUrl + "/GetPerformance");
  }

  getGoalsReview(portfolioID: number) {
    return this.http.get(this.baseUrl + "/GoalsReview?portfolioID=" + portfolioID);
  }

  getCategoryPerformance(classification: string, category: string) {
    return this.http.get(this.baseUrl + "/GetCategoryPerformance?classification=" + classification + "&category=" + category);
  }

}
