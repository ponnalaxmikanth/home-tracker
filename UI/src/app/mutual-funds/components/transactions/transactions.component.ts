import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as FileSaver from 'file-saver';
// import { saveAs } from 'file-saver';

@Component({
  selector: 'ht-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionsComponent implements OnInit {
  @Input() fundTransactions: any;
  public transactions: any;
  public cols: any[] = [];

  @Input() groupTransactions: any;
  public grpTransactions: boolean = false;

  constructor() {
    this.cols = [
      { field: 'transactionDate', header: 'Date', type: 'Date', class: 'date track-date', filter: false, display: true },
      { field: 'portfolio', header: 'Portfolio', type: 'String', class: 'portfolio', filter: false, display: true },
      { field: 'goal', header: 'Goal', type: 'String', class: 'goal', filter: true, display: true },
      { field: 'schemaName', header: 'Name', class: 'schema-name', filter: true, display: true },
      { field: 'category', header: 'Category', class: 'category', filter: true, display: true },
      { field: 'units', header: 'Units', class: 'number units', filter: false, display: true },
      { field : 'amount', header: 'Amount', class: 'amount number', filter: false, display: true },
      { field: 'currentValue', header: 'Current', class: 'current-value number', filter: false, display: true },
      { field : 'profit', header: 'Profit', class: 'profit number', filter: false, display: true },
      { field : 'profitPer', header: 'Profit (%)', class: 'absolute-return number percent', filter: false, display: true },
      { field : 'xirr', header: 'XIRR', class: 'xirr number percent', filter: false, display: true },
      { field : 'withholdDays', header: 'Days', class: 'number with-hold-days', filter: false, display: true },
    ];
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.fundTransactions) {
      this.transactions = changes.fundTransactions.currentValue;
    }

    if (changes && changes.groupTransactions) {
      this.grpTransactions = changes.groupTransactions.currentValue;
      this.cols[1].display = changes.groupTransactions.currentValue;
    }
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.transactions);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "transactions");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
