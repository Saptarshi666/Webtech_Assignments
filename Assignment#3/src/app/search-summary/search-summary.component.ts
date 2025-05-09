import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { EMPTY, Subject, catchError, debounceTime, forkJoin, last, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { StockSearchComponent } from '../stock-search/stock-search.component';
@Component({
  selector: 'app-search-summary',
  templateUrl: './search-summary.component.html',
  styleUrl: './search-summary.component.css'
})
export class SearchSummaryComponent implements OnInit,OnDestroy{
 searchcalled:boolean=false
  private _stockSearchComponent: StockSearchComponent | undefined;
  @Output() itemClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() newsflag: EventEmitter<string> = new EventEmitter<string>()
  @Output() movedown: EventEmitter<number> = new EventEmitter<number>()
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
  responseobtained:boolean = false
  c: number = 0
  d:number = 0
  dp: number = 0
  t: number = 0
 noerror:boolean = true
  
  amountleft: number = 0
  tstring:string = ''
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
  
  marketopen:boolean = true
   @ViewChild(StockSearchComponent) 
  set stockSearchComponent(value: StockSearchComponent) {
    console.log("I AM SET ONLY ONCE")
    this._stockSearchComponent = value;
    this.setSearchControlValue();
  }
  private setSearchControlValue(): void {
    if (this._stockSearchComponent) {
      this._stockSearchComponent.setSearchControlValue(this.stock_ticker);
    }
  }
  ngOnDestroy(): void {
   /*   this.sharedDataService.searchsummary = this.searchsummary*/
    this.sharedDataService.searchcalled = this.searchcalled 
    this.sharedDataService.response = this.response
    this.sharedDataService.stock_ticker = this.ticker
    this.sharedDataService.result = this.result
    this.sharedDataService.userInputValue = this.userInputValue
    this.sharedDataService.userInputValue1 = this.userInputValue1
    this.sharedDataService.showAlert = this.showAlert 
    this.sharedDataService.alertMessage = this.alertMessage
    this.sharedDataService.imageUrl = this.imageUrl
    this.sharedDataService.ticker = this.ticker
    this.sharedDataService.name = this.name
    this.sharedDataService.exchange = this.exchange
    this.sharedDataService.c = this.c 
    this.sharedDataService.d = this.d
    this.sharedDataService.dp = this.dp
    this.sharedDataService.t = this.t
   /*  this.sharedDataService.h = this.h
    this.sharedDataService.l = this.l
    this.sharedDataService.o = this.o
    this.sharedDataService.pc = this.pc
    this.sharedDataService.finnhubIndustry = this.finnhubIndustry */
    this.sharedDataService.amountleft = this.amountleft
    this.sharedDataService.tstring = this.tstring
    /* this.sharedDataService.ipo = this.ipo
    this.sharedDataService.weburl = this.weburl */
    this.sharedDataService.totalmoney = this.totalmoney
    this.sharedDataService.isDataLoaded = this.isDataLoaded
    this.sharedDataService.isDataLoaded1 = this.isDataLoaded1
    this.sharedDataService.starimageurl = this.starimageurl
    this.sharedDataService.changeurl = this.changeurl
    this.sharedDataService.isConditionTrue = this.isConditionTrue
    this.sharedDataService.isNotEnoughMoney = this.isNotEnoughMoney
    this.sharedDataService.isNotEnoughStocks = this.isNotEnoughStocks
    this.sharedDataService.amountbought = this.amountbought
    this.sharedDataService.isButtonDisabled = this.isButtonDisabled
    this.sharedDataService.amountsold = this.amountsold
    this.sharedDataService.colorofalert = this.colorofalert
    this.sharedDataService.fontColor = this.fontColor
    this.sharedDataService.marketstatusmessage = this.marketstatusmessage
    this.sharedDataService.fontColor1 = this.fontColor1
    // this.sharedDataService.peers = this.peers
    this.sharedDataService.marketopen = this.marketopen
   /*  this.sharedDataService.chartOptions = this.chartOptions */
    this.sharedDataService.isStarYellow = this.isStarYellow
  }
  async ngOnInit() {
    var item = this.sharedDataService.ticker
      if (item == '') {
     /*    this.searchsummary = this.sharedDataService.searchsummary*/
     var apiUrl=`/get_watchlist?`
     var response:any
     try {
       response = await this.http.get(apiUrl).toPromise();
       }
      catch (error) {
      console.error('Error:', error);
      } 
      
      const extractedData = response.map((obj: { stock_ticker: any; }) => obj.stock_ticker);
      const newDataObject = [ extractedData ];
      console.log("newDataObject is ",newDataObject[0])
      if (newDataObject[0].includes(this.sharedDataService.stock_ticker))
      {
       this.resetStarColor(true)
      }
      else{
        this.resetStarColor(false)
      }
        this.searchcalled = this.sharedDataService.searchcalled  
        this.response = this.sharedDataService.response
        this.ticker = this.sharedDataService.stock_ticker
        console.log("this.ticker is ", this.ticker)
        console.log("this.sharedDataService.stock_ticker is ", this.sharedDataService.stock_ticker)
        this.result = this.sharedDataService.result
        this.userInputValue = this.sharedDataService.userInputValue
        this.userInputValue1 = this.sharedDataService.userInputValue1
        this.showAlert = this.sharedDataService.showAlert
        this.alertMessage = this.sharedDataService.alertMessage
        this.name = this.sharedDataService.name
        this.exchange = this.sharedDataService.exchange
        this.c = this.sharedDataService.c
        this.d = this.sharedDataService.d
        this.dp = this.sharedDataService.dp
        this.t = this.sharedDataService.t
     /*    this.h = this.sharedDataService.h
        this.l = this.sharedDataService.l
        this.o = this.sharedDataService.o
        this.pc = this.sharedDataService.pc
        this.finnhubIndustry = this.sharedDataService.finnhubIndustry */
        this.amountleft = this.sharedDataService.amountleft
        this.tstring = this.sharedDataService.tstring
     /*    this.ipo = this.sharedDataService.ipo
        this.weburl = this.sharedDataService.weburl */
        this.totalmoney = this.sharedDataService.totalmoney
        this.isDataLoaded = this.sharedDataService.isDataLoaded
        this.isDataLoaded1 = this.sharedDataService.isDataLoaded1
        this.starimageurl = this.sharedDataService.starimageurl
        this.changeurl = this.sharedDataService.changeurl
        this.isConditionTrue = this.sharedDataService.isConditionTrue
        this.isNotEnoughMoney = this.sharedDataService.isNotEnoughMoney
        this.isNotEnoughStocks = this.sharedDataService.isNotEnoughStocks
        this.amountbought = this.sharedDataService.amountbought
        this.isButtonDisabled = this.sharedDataService.isButtonDisabled
        this.amountsold = this.sharedDataService.amountsold
        this.colorofalert = this.sharedDataService.colorofalert
        this.fontColor = this.sharedDataService.fontColor
        this.marketstatusmessage = this.sharedDataService.marketstatusmessage
        this.fontColor1 = this.sharedDataService.fontColor1
       /*  this.peers = this.sharedDataService.peers */
        this.marketopen = this.sharedDataService.marketopen
       /*  this.chartOptions = this.sharedDataService.chartOptions */
     /*    this.shouldchartbeinitialized = true */
     //   Highcharts.chart('line-chart-container', this.sharedDataService.chartOptions);
      } else {
        /* this.shouldchartbeinitialized = false */
          this.stock_ticker = item;
          this.onSearch(item);
      }
   
  }
  
  async BuyNow(userInputValue:Number):Promise<void>{
    this.isConditionTrue = true
    var apiUrl = `/add_portfolio?stock_ticker=${this.stock_ticker}&value=${this.c}&quantity=${userInputValue}`
      var response :any = ''
      try {
        response = await this.http.get(apiUrl).toPromise();
        this.response = response
     }
     catch (error) {
       console.error('Error:', error);
     }
    this.showSelfClosingWatchlistAlert(1)
  }
  async SellNow(userInputValue:Number):Promise<void>{
    var apiUrl = `/remove_portfolio?stock_ticker=${this.stock_ticker}&value=${this.c}&quantity=${userInputValue}`
    var response :any = ''
    try {
      response = await this.http.get(apiUrl).toPromise();
      this.response = response
   }
   catch (error) {
     console.error('Error:', error);
   }
   if (this.response == "empty")
   {
    this.isConditionTrue = false
   }
    this.showSelfClosingWatchlistAlert(2)
  }
  checkWallet(): void {
    if (this.userInputValue == null || this.userInputValue <1 )
    {
      this.isButtonDisabled = true
    }
    if (this.userInputValue * this.c > this.totalmoney) {
        this.isNotEnoughMoney = true;
        this.isButtonDisabled = true;
        this.amountbought = this.userInputValue * this.c 
    } else {
        this.isNotEnoughMoney = false;
        this.isButtonDisabled = false;
        this.amountbought = this.userInputValue * this.c
    }
}
checkWallet1(): void {
  if (this.userInputValue1 == null || this.userInputValue1 <1 )
  {
    this.isButtonDisabled = true
  }
  if (this.userInputValue1 * this.c > this.amountbought) {
      this.isNotEnoughStocks = true;
      this.isButtonDisabled = true;
      this.amountsold = this.userInputValue * this.c 
  } else {
      this.isNotEnoughStocks = false;
      this.isButtonDisabled = false;
      this.amountsold = this.userInputValue * this.c
      this.amountleft = this.amountbought - this.amountsold
  }
}
  showSelfClosingWatchlistAlert(num:number, duration: number = 3000): void {
    if (num == 0)
    {
      this.alertMessage = this.ticker+" added to Watchlist";
      this.colorofalert = true;
    }
    else if(num == 1)
    {
      this.alertMessage = this.ticker+" bought successfully";
      this.colorofalert = true;
    }
    else if(num == 2)
    {
      this.alertMessage = this.ticker+" removed from Watchlist";
      this.colorofalert = false;
    }
    else
    {
      this.alertMessage = this.ticker +" sold successfully";
      if(this.amountleft == 0)
      {
        this.isConditionTrue = false
      }
      this.colorofalert = false;
    }
    this.showAlert = true;
    const generalContainer = document.querySelector('.generalcontainer');
    if (generalContainer) {
      generalContainer.classList.add('move-down');
    }
    const imagecontainer = document.querySelector('.image-container');
    if (imagecontainer) {
      imagecontainer.classList.add('move-down1');
    }
    const lastprice = document.querySelector('.lastprice')
    if(lastprice)
    {
      lastprice.classList.add('move-down2')
    }
    const tabs = document.querySelector('.tabs')
    if(tabs)
    {
    tabs.classList.add('move-down2')
    }
    const change = document.querySelector('.change')
    if(change)
    {
    change.classList.add('move-down2')
    }
    const time = document.querySelector('.time')
    if(time)
    {
      time.classList.add('move-down2')
    }
    const marketstatus = document.querySelector('.Marketstatus')
    if(marketstatus)
    {
      marketstatus.classList.add('move-down2')
    }
    const tab = document.querySelector('.tab')
    if(tab)
    {
      tab.classList.add('move-down2')
    }
    const stockinfo = document.querySelector('.stockinfo')
    if(stockinfo)
    {
      stockinfo.classList.add('move-down2')
    }
    const companyinfo = document.querySelector('.companyinfo')
    if(companyinfo)
    {
      companyinfo.classList.add('move-down2')
    }
    this.movedown.emit(1);
    setTimeout(() => {
      this.showAlert = false;
      if (generalContainer) {
        generalContainer.classList.remove('move-down');
      }
      if (imagecontainer) {
        imagecontainer.classList.remove('move-down1');
      }
      if(lastprice){
        lastprice.classList.remove('move-down2')
      }
      if(change){
        change.classList.remove('move-down2')
      }
      if(time){
        time.classList.remove('move-down2')
      }
      if(marketstatus)
      {
        marketstatus.classList.remove('move-down2')
      }
      if(tab)
      {
        tab.classList.remove('move-down2')
      }
      if(stockinfo)
      {
        stockinfo.classList.remove('move-down2')
      }
      if(companyinfo)
      {
        companyinfo.classList.remove('move-down2')
      }
      if(tabs)
    {
    tabs.classList.remove('move-down2')
    }
    }, duration);
  }
  constructor(private http: HttpClient, private modalService: NgbModal,private renderer: Renderer2,private route:ActivatedRoute,private router: Router,private sharedDataService: SharedDataService) {
  }
/*   ngAfterViewInit() {
    this.chartInitialized = true;
    if(this.shouldchartbeinitialized)
      {
        this.createChart();
      }
} 
createChart() {
  if (this.chartInitialized) {
      Highcharts.chart('line-chart-container', this.sharedDataService.chartOptions);
  }
}*/
  setActiveButton(button1: HTMLButtonElement,button2: HTMLButtonElement,button3: HTMLButtonElement,button4: HTMLButtonElement): void {
    button1.style.border = 'none';
    button2.style.border = 'none'
    button3.style.border = 'none'
    button4.style.border = 'none'
    button1.style.color = 'none';
    button2.style.color = 'none'
    button3.style.color = 'none'
    button4.style.color = 'none'
    button1.style.color = '#5e95b8'
    button1.style.borderBottom = '2px solid #828696'
   

  }
  getFormattedDateTime(timestamp: any): void {
    if (timestamp != null) {
      const date = new Date(timestamp * 1000); 
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  this.tstring =  `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const currentTime = new Date().getTime(); 
  const differenceInMilliseconds = Math.abs(currentTime - (timestamp*1000)); 
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60)); 
  if (differenceInMinutes > 5) {
    this.fontColor1 = "#ee0606"
    this.marketopen = false
    this.marketstatusmessage = 'Market Closed on '+ this.tstring
} else {
  this.marketstatusmessage = 'Market is open'
  this.fontColor1 = "#0d770f"
  this.marketopen = true
}
    }
  }
 

  isStarYellow: boolean = false;

  async makeYellow(): Promise<void> {
    this.isStarYellow = !this.isStarYellow;
    if(this.isStarYellow){
      this.starimageurl = "/assets/Images/img/star-yellow.svg"
      var apiUrl = `/add_watchlist?stock_ticker=${this.ticker}`
      var response :any = ''
      try {
        response = await this.http.get(apiUrl).toPromise();
        this.response = response
     }
     catch (error) {
       console.error('Error:', error);
     }
     this.showSelfClosingWatchlistAlert(0)
    }
    else{
      this.starimageurl = "/assets/Images/img/star.svg"
      var apiUrl = `/remove_watchlist?stock_ticker=${this.ticker}`
      var response :any = ''
      try {
        response = await this.http.get(apiUrl).toPromise();
        this.response = response
     }
     catch (error) {
       console.error('Error:', error);
     }
     this.showSelfClosingWatchlistAlert(2)
    }
  }
  async obtainsearchandsummary1(inputValue:string): Promise<void>
  {   
    this.stock_ticker = inputValue
    var t = 0
    var apiUrl = `/company?stock_ticker=${inputValue}`
    var response :any = ''
    try {
      response = await this.http.get(apiUrl).toPromise();
      this.response = response
   }
   catch (error) {
     console.error('Error:', error);
     this.noerror = false
   }
   this.imageUrl = response.profileData.logo
   this.ticker = response.profileData.ticker
   this.name = response.profileData.name
   this.exchange = response.profileData.exchange
   this.c = parseFloat(response.stockData.c.toFixed(2));
   this.d = parseFloat(response.stockData.d.toFixed(2));
   this.dp = parseFloat(response.stockData.dp.toFixed(2));
   this.t = response.stockData.t
   this.getFormattedDateTime(response.stockData.t)
   if(response.stockData.d >= 0)
   {
     this.fontColor = "#0d770f"
     this.changeurl = '/assets/Images/img/caretup.svg'
   }
   else
   {
      this.fontColor = "#ee0606"
       this.changeurl = '/assets/Images/img/caretdown.svg'
   }
  
         this.responseobtained = true
      var apiUrl=`/get_watchlist?`
      var response:any
      try {
        response = await this.http.get(apiUrl).toPromise();
        }
       catch (error) {
       console.error('Error:', error);
       } 
       
       const extractedData = response.map((obj: { stock_ticker: any; }) => obj.stock_ticker);
       const newDataObject = [ extractedData ];
       if (newDataObject[0].includes(inputValue))
       {
        this.resetStarColor(true)
       }
       else
       {
        this.resetStarColor(false)
       }
       var apiUrl=`/get_portfolio?`
      var response:any
      try {
        response = await this.http.get(apiUrl).toPromise();
        }
       catch (error) {
       console.error('Error:', error);
       } 
       
       const extractedData1 = response.map((obj: { stock_ticker: any; }) => obj.stock_ticker);
       const newDataObject1 = [ extractedData1 ];
       console.log("newDataObject is ",newDataObject1[0])
       if (newDataObject1[0].includes(this.sharedDataService.stock_ticker))
       {
        this.isConditionTrue = true
       }
       else{
         this.isConditionTrue = false
       }
  }
  callnews()
  {
    this.isDataLoaded1 = false
    this.newsflag.emit(this.stock_ticker)
  }
  onSearch(inputValue: string): void {
    this.isConditionTrue = false;
    this.isDataLoaded = false;
    this.searchcalled = true;
    this.isDataLoaded1 = false;
    
    setTimeout(() => {  
     const response = this.obtainsearchandsummary1(inputValue);
    if (response) {
      this.response = response;
      this.isDataLoaded = true;
      this.isDataLoaded1 = true;
      this.searchcalled = false;
    }
      const intervalId = setInterval(() => {
        if (this.marketopen) {
          this.obtainsearchandsummary1(this.stock_ticker);
        } else {
          clearInterval(intervalId); 
        }
      }, 15000);
    }, 3000); 
  }
 async openBuyModal(content: any) {
  var apiUrl = `/get_cash`
      var response :any = ''
      try {
        response = await this.http.get(apiUrl).toPromise();
        this.response = response
     }
     catch (error) {
       console.error('Error:', error);
     }
this.totalmoney = response[0].total_cash
  this.modalService.open(content, { centered: true,windowClass: 'modal-top' });
} 
  async openSellModal(content: any) {
  var apiUrl = `/get_cash`
  var response :any = ''
  try {
    response = await this.http.get(apiUrl).toPromise();
    this.response = response
 }
 catch (error) {
   console.error('Error:', error);
 }
this.totalmoney = response[0].total_cash
  this.modalService.open(content, { centered: true,windowClass: 'modal-top' });
} 
  resetStarColor(input:boolean): void {
    if ( input == true)
    { 
    this.isStarYellow = input;
    this.starimageurl = "/assets/Images/img/star-yellow.svg"
    }
    else
    {
      this.isStarYellow = input;
      this.starimageurl = '/assets/Images/img/star.svg'
    }
  }
  closeAlert(): void{
    const generalContainer = document.querySelector('.generalcontainer');
    const imagecontainer = document.querySelector('.image-container');
    const lastprice = document.querySelector('.lastprice')
    const time = document.querySelector('.time')
    const change = document.querySelector('.change')
    const marketstatus = document.querySelector('.Marketstatus')
    const tab = document.querySelector('.tab')
    const stockinfo = document.querySelector('.stockinfo')
    const companyinfo = document.querySelector('.companyinfo')
    const tabs = document.querySelector('.tabs')
    this.movedown.emit(2);
    setTimeout(() => {
      this.showAlert = false;
      if (generalContainer) {
        generalContainer.classList.remove('move-down');
      }
      if (imagecontainer) {
        imagecontainer.classList.remove('move-down1');
      }      
      if(lastprice){
        lastprice.classList.remove('move-down2')
      }
      if(change){
        change.classList.remove('move-down2')
      }
      if(time){
        time.classList.remove('move-down2')
      }
      if(marketstatus)
      {
        marketstatus.classList.remove('move-down2')
      }
      if(tab)
      {
        tab.classList.remove('move-down2')
      }
      if(stockinfo)
      {
        stockinfo.classList.remove('move-down2')
      }
      if(companyinfo)
      {
        companyinfo.classList.remove('move-down2')
      }
      if(tabs)
      {
      tabs.classList.remove('move-down2')
      }
    });
  }

}
