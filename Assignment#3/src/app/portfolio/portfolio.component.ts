import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
 export class PortfolioComponent implements AfterViewInit  {
  stock_ticker :any
  storedResponses: any;
  response1:any
  response2:any
  response3:any
  response4:any
  responsesReady: boolean = false;
  valuesindatabase:any
  isDataLoaded:boolean= false
  isDataLoaded1:boolean= false
  showAlert:boolean = false;
  alertMessage:string = '';
  colorofalert:boolean = false
  colorofalert1:boolean = false
  showAlert1:boolean = false
  response:any
  totalmoney:any
  isConditionTrue: boolean = false;
  ticker:string = ''
  cur_sticker_index:number = 0
  c:any
  isButtonDisabled: boolean = false;
  isNotEnoughMoney: boolean = false;
  isNotEnoughStocks:boolean = false;
  amountbought:number = 0;
  amountbought1:string=''
  amountsold:number = 0;
  amountsold1:string = ''
  amountleft: number = 0
  totalmoney1:string = ''
  c1:string = ''
  userInputValue: number = 0;
  userInputValue1: number = 0;
  constructor(private http: HttpClient, private modalService: NgbModal,private renderer: Renderer2,private router: Router,private shareddataservice:SharedDataService) { }
  async ngAfterViewInit()
{
  var apiUrl=`/get_portfolio`
  var response:any
  try {
    response = await this.http.get(apiUrl).toPromise();
    }
   catch (error) {
   console.error('Error:', error);
   } 
   this.response = response
   console.log(response)
  const extractedData = response.map((obj: { stock_ticker: any; }) => obj.stock_ticker);
   const newDataObject = [ extractedData ];
    this.valuesindatabase = newDataObject[0]
   if (this.valuesindatabase.length == 0)
   {
    this.showAlert = true
    this.colorofalert = true
    this.isDataLoaded1 = false
   }
   const observables = this.fetchMultipleStockData(newDataObject[0]);

   const promise = forkJoin(observables).toPromise();
   try {
    this.storedResponses = await promise; 
    this.responsesReady = true; 
  } catch (error) {
    console.error('Error fetching responses:', error);
  } 
  var apiUrl = `/get_cash`
  var response :any = ''
  try {
    response = await this.http.get(apiUrl).toPromise();
    this.response1 = response
 }
 catch (error) {
   console.error('Error:', error);
 }
  this.totalmoney = this.response1[0].total_cash
  this.totalmoney1 = this.totalmoney.toFixed(2)
 this.isDataLoaded = true  
  this.isDataLoaded1 = true  
}
fetchMultipleStockData(stockTickers: string[]): Observable<any>[] {
  return stockTickers.map(ticker => this.fetchStockData(ticker));
}
fetchStockData(stockTicker: string): Observable<any> {
  return this.http.get<any>(`/quotes?stock_ticker=${stockTicker}`);
}
async openBuyModal(content: any,i:number) {

this.ticker = this.storedResponses[i].stockData.ticker
this.c = this.storedResponses[i].profileData.c
this.totalmoney1 = this.totalmoney.toFixed(2)
this.c1 =this.c.toFixed(2) 
this.cur_sticker_index = i
  this.modalService.open(content, { centered: true,windowClass: 'modal-top' });
} 
  async openSellModal(content: any,i:number) {
  var apiUrl = `/get_cash`
  var response :any = ''
  try {
    response = await this.http.get(apiUrl).toPromise();
    this.response2 = response
 }
 catch (error) {
   console.error('Error:', error);
 }

this.ticker = this.storedResponses[i].stockData.ticker
this.c = this.storedResponses[i].profileData.c
this.totalmoney1 = this.totalmoney.toFixed(2)
this.c1 =this.c.toFixed(2) 
this.cur_sticker_index = i
  this.modalService.open(content, { centered: true,windowClass: 'modal-top' });
} 
async BuyNow(userInputValue:any):Promise<void>{
  this.isConditionTrue = true
  var apiUrl = `/add_portfolio?stock_ticker=${this.ticker}&value=${this.c}&quantity=${userInputValue}`
    var response :any = ''
    try {
      response = await this.http.get(apiUrl).toPromise();
      this.response3 = response
   }
   catch (error) {
     console.error('Error:', error);
   }
   this.totalmoney =  this.totalmoney - (this.c*userInputValue)
   this.totalmoney1 = this.totalmoney.toFixed(2)
   this.ngAfterViewInit()
  this.showSelfClosingWatchlistAlert(1)
  
}
async SellNow(userInputValue:any):Promise<void>{
  var apiUrl = `/remove_portfolio?stock_ticker=${this.ticker}&value=${this.c}&quantity=${userInputValue}`
  console.log(apiUrl)
  var response :any = ''
  try {
    response = await this.http.get(apiUrl).toPromise();
    this.response4 = response
 }
 catch (error) {
   console.error('Error:', error);
 }
 console.log(this.response4)
 if (this.response4 == "empty")
 {
  this.isConditionTrue = false
  this.isDataLoaded1 = false
  this.showAlert = true
    this.colorofalert = true
 }
 this.totalmoney =  this.totalmoney + (this.c*userInputValue)
 this.totalmoney1 = this.totalmoney.toFixed(2)
 this.ngAfterViewInit()
  this.showSelfClosingWatchlistAlert(2)
  
}
showSelfClosingWatchlistAlert(num:number,duration: number = 3000): void {
 
   if(num == 1)
  {
    this.alertMessage = this.ticker+" bought successfully";
    this.colorofalert1 = true;
  }
  else 
  {
    this.alertMessage = this.ticker+" sold successfully";
    this.colorofalert1 = false;
  }
  this.showAlert1 = true;
  const Container = document.querySelector('.centered-div');
    if (Container) {
      Container.classList.add('move-down2');
    }
    const Headline = document.querySelector('.Headline');
    if (Headline) {
      Headline.classList.add('move-down');
    }
    const walletinfo = document.querySelector('.walletinfo')
    if(walletinfo)
    {
      walletinfo.classList.add('move-down')
    }
  setTimeout(() => {
    this.showAlert1 = false;
    if (Container) {
      Container.classList.remove('move-down2');
    }
    if (Headline) {
      Headline.classList.remove('move-down');
    }
    if(walletinfo)
    {
      walletinfo.classList.remove('move-down')
    }
  }, duration);
}
checkWallet(): void {
  if (this.userInputValue == null || this.userInputValue <1 )
  {
    this.isButtonDisabled = true
  }
  if (this.userInputValue * this.c > this.totalmoney) {
      this.isNotEnoughMoney = true;
      this.isButtonDisabled = true;
      this.amountbought = (this.userInputValue * this.c );
      this.amountbought1 = this.amountbought.toFixed(2)
  } else {
      this.isNotEnoughMoney = false;
      this.isButtonDisabled = false;
      this.amountbought = (this.userInputValue * this.c);
      this.amountbought1 = this.amountbought.toFixed(2)
  }
}
checkWallet1(): void {
if (this.userInputValue1 == null || this.userInputValue1 <1 )
{
  this.isButtonDisabled = true
}
if (this.userInputValue1 > this.response[this.cur_sticker_index].quantity) {
    this.isNotEnoughStocks = true;
    this.isButtonDisabled = true;
    this.amountsold = this.userInputValue1 * this.c 
    this.amountsold1 = this.amountsold.toFixed(2)
} else {
  console.log(this.userInputValue1)
    this.isNotEnoughStocks = false;
    this.isButtonDisabled = false;
    this.amountsold = this.userInputValue1 * this.c
    this.amountleft = this.amountbought - this.amountsold
    this.amountsold1 = this.amountsold.toFixed(2)
}
}
handleDivClick(i:number)
{
var stock_ticker = this.valuesindatabase[i]
this.router.navigateByUrl("/search/"+stock_ticker);
this.shareddataservice.ticker = stock_ticker

}
 roundValue(index: number): string {
 const result = this.response[index].value / this.response[index].quantity;
  return result.toFixed(2);
  
}
roundValue1(index: number): string {
  const result = this.response[index].value;
  return result.toFixed(2);

}
roundValue2(index: number): string {
  const result = (this.response[index].value / this.response[index].quantity) - this.storedResponses[index].profileData.c
  return result.toFixed(2);
  
}
roundValue3(index: number): string {
  const result =  this.storedResponses[index].profileData.c
  return result.toFixed(2);
  
}
roundValue4(index: number): string {
 const result =  this.storedResponses[index].profileData.c*this.response[index].quantity
  return result.toFixed(2);
  
} 
roundValueColor(index: number): string {
  const value =  (this.response[index].value / this.response[index].quantity) - this.storedResponses[index].profileData.c
  return value < 0 ? 'red' : (value > 0 ? 'green' : 'black');
}
roundValueTest(index: number): number {
  const value =  (this.response[index].value / this.response[index].quantity) - this.storedResponses[index].profileData.c
  return value ;
}
}
