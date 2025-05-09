import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements AfterViewInit{
  @Output() itemClicked: EventEmitter<string> = new EventEmitter<string>();
  i: number = 0
  chartInitialized: boolean = false;
  shouldchartbeinitialized:boolean = false;
  searchsummary:boolean = false
  searchcalled: boolean = false
  response:any
  result:any
  fontColor:string = ''
  t: number = 0
  isDataLoaded1:boolean = false
  constructor(private http: HttpClient,private sharedDataService: SharedDataService) { }
  ngAfterViewInit(): void {
    console.log("DID WE MAKE IT TO SUMMARY")
    var stockticker =  this.sharedDataService.stock_ticker 
    console.log("the stock ticker at summary is ", stockticker)
    if (stockticker!='')
    {
      this.onobtain(stockticker)
    }
  }
  async onobtain(inputValue:string){
    console.log("this is the onobtain at summary is ")
    var apiUrl = `/company?stock_ticker=${inputValue}`
    var response :any = ''
    try {
      response = await this.http.get(apiUrl).toPromise();
      this.response = response
   }
   catch (error) {
     console.error('Error:', error);
   }
   console.log(response)
   this.h = parseFloat(response.stockData.h.toFixed(2));
   this.l = parseFloat(response.stockData.l.toFixed(2));
   this.o = parseFloat(response.stockData.o.toFixed(2));
   this.pc = parseFloat(response.stockData.pc.toFixed(2));
   this.ipo = response.profileData.ipo
   this.weburl = response.profileData.weburl 
   this.finnhubIndustry = response.profileData.finnhubIndustry
   this.peers = response.peers
   this.t = response.stockData.t
   if(response.stockData.d >= 0)
   {
     this.fontColor = "#0d770f"

   }
   else
   {
      this.fontColor = "#ee0606"
   }
   apiUrl =   `/chart?stock_ticker=${inputValue}&timestamp=${this.t}`
   try {
    response = await this.http.get(apiUrl).toPromise();
    }
   catch (error) {
   console.error('Error:', error);
   } 
   this.result = response.results
   const chartTitle = `${inputValue} Hourly Price Variation`;
   const chartData = this.result.map((item: { t: any; c: any; }) => ({
          x: item.t, 
          y: item.c
        })
        );
   const chartOptions: Highcharts.Options = {
          chart: {
            type: 'line',
            backgroundColor: '#f4f4f4', 
          },
          title: {
            text:  chartTitle, 
          },
          xAxis: {
            visible: true, 
            type: 'datetime',
            labels: {
              format: '{value:%H:%M}', 
            },
          },
          yAxis: {
            visible: true,
            opposite: true,
            title: {
              text: '' 
            }
          },
          plotOptions: {
            line: {
              color: this.fontColor, 
            },
          },
          legend: {
            enabled: false 
          },
          series: [{
            type: 'line',
            data: chartData,
            name:'Data'
          }],
        };
          Highcharts.chart('line-chart-container', chartOptions); 
         this.chartOptions = chartOptions
         this.isDataLoaded1 = true
  }
  onItemClick(item: string) {
    // this._stockSearchComponent?.searchControl.setValue(item)
    this.sharedDataService.ticker = item
    this.sharedDataService.stock_ticker = item
    this.itemClicked.emit(item)
  } 
  h:number = 0
  l:number = 0
  o:number = 0
  peers:string[] = []
  pc:number = 0
  finnhubIndustry:string = ''
  ipo:string = ''
  weburl:string = ''
  chartOptions:object = {}
}
