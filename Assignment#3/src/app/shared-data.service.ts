import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private searchDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private searchDataVal: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private searchDataVal1: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private searchDataVal2: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private searchDataSubjectSummary: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchsummary:boolean = false
  searchcalled: boolean = false
  response:any 
  stock_ticker:string = ''
  result:any
  userInputValue: number = 0;
  userInputValue1: number = 0;
  showAlert: boolean = false;
  alertMessage: string = '';
  imageUrl: string = ''
  ticker: string = ''
  name: string = ''
  exchange: string = ''
  c: number = 0
  d:number = 0
  dp: number = 0
  t: number = 0
  h:number = 0
  l:number = 0
  o:number = 0
  pc:number = 0
  finnhubIndustry:string = ''
  amountleft: number = 0
  tstring:string = ''
  ipo:string = ''
  weburl:string = ''
  totalmoney: number = 25000.00
  isDataLoaded: boolean = false;
  isDataLoaded1:boolean = false;
  starimageurl: string = '/assets/Images/img/star.svg'
  changeurl: string = ''
  isConditionTrue: boolean = false;
  isNotEnoughMoney: boolean = false;
  isNotEnoughStocks:boolean = false;
  amountbought:number = 0;
  isButtonDisabled: boolean = false;
  amountsold:number = 0;
  colorofalert:boolean = true;
  fontColor: string = 'red'
  marketstatusmessage:string =''
  fontColor1:string = 'red'
  peers:string[] = []
  marketopen:boolean = true
  chartOptions:object = {}
  isStarYellow: boolean = false;
  constructor() { }
  setSearchData(data: string): void {
    this.searchDataSubject.next(data);
  }
  setSearchDataVal(data:number):void{
    this.searchDataVal.next(data)
  }
  setSearchDataVal1(data:number):void{
    this.searchDataVal1.next(data)
  }
  setSearchDataVal2(data:number):void{
    this.searchDataVal2.next(data)
  }
  setSearchDataSummary(data:string):void{
    this.searchDataSubjectSummary.next(data)
  }
  getSearchDataVal(): Observable<number> {
    return this.searchDataVal.asObservable();
  }
  getSearchDataVal1(): Observable<number> {
    return this.searchDataVal1.asObservable();
  }
  getSearchDataVal2(): Observable<number> {
    return this.searchDataVal2.asObservable();
  }
  getSearchData(): Observable<string> {
    return this.searchDataSubject.asObservable();
  }
  getSearchDataSummary():Observable<string>{
    return this.searchDataSubjectSummary.asObservable()
  }
  private searchSubject = new Subject<string>();
  searchEvent$ = this.searchSubject.asObservable();

  emitSearchEvent(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }
}
