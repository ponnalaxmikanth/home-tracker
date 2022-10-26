import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Event as NavigationEvent, Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';

@Component({
  selector: 'ht-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public items: MenuItem[] = [];
  public href: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private _fundsServiceService: MutualFundsService) { }

  ngOnInit(): void {

    // this.router.events
    //       .subscribe(
    //         (event: NavigationEvent) => {
    //           if(event instanceof NavigationStart) {
    //             this._fundsServiceService.portfolioID.next(Number(this.getParamValueQueryString(event.url, 'portfolioid')));
    //           }
    //         });

    this.items = [
      {
          label: 'Mutual Funds',
          items: [
            {
              label: 'All', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'All', 'portfolioid': -1},
              command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
            },
            {
              label: 'Family', icon: 'pi pi-home', items: [
                {
                  label: 'All', icon: 'pi pi-home', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Family', 'portfolioid': 99 },
                  command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
                },
                {
                  label: 'Parents', icon: 'pi pi-users', items: [
                    {
                      label: 'All', icon: 'pi pi-users', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Parents', 'portfolioid': 92 },
                      command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
                    },
                    {
                      label: 'Kanth', icon: 'pi pi-prime', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Kanth', 'portfolioid': 1 },
                      command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
                    },
                    {
                      label: 'Priya', icon: 'pi pi-heart-fill', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Priya', 'portfolioid': 4 },
                      command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
                    },
                  ]
                },
                {
                  label: 'Kids', icon: 'pi pi-users', items: [
                    {
                      label: 'All', icon: 'pi pi-users', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Kids', 'portfolioid': 91 },
                      command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
                    },
                    {
                      label: 'Vedaansh', icon: 'pi pi-vimeo', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Vedaansh', 'portfolioid': 6 },
                      command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
                    },
                    {
                      label: 'Child 2', icon: 'pi pi-twitter', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Child-2', 'portfolioid': 7 },
                      command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
                    },
                  ]
                },
              ],
            },
            {
              label: 'Vaagdevi', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Vaagdevi', 'portfolioid': 2 },
              command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
            },
            {
              label: 'Dad', routerLink: ['/mutual-funds'], queryParams: {'portfolio': 'Dad', 'portfolioid': 3 },
              command: (event) => { this._fundsServiceService.portfolioID.next(event.item.queryParams.portfolioid); }
            },

            {label: 'Performance', routerLink: ['/mutual-funds/performance'] },
            {label: 'Goals', routerLink: ['/mutual-funds/goals'] },
            {label: 'Goal Allocations', routerLink: ['/mutual-funds/goal-allocations'] },
            {label: 'Folios', routerLink: ['/mutual-funds/folios'] },
          ]
      },
      {
        label: 'Stocks',
          items: [
            { label: 'Stocks', routerLink: ['/stocks'] },
            { label: 'Performance', routerLink: ['/stocks/performance'] }
          ]
      },
      {label: 'Home', routerLink: ['/home'] },
    ];
  }

  getParamValueQueryString(url: string, paramName : string ) {
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

}
