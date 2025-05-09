import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedDataService } from '../shared-data.service';

export interface TableData {
  rowHeader: string;
  column1: string;
  column2: string;
}
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent implements AfterViewInit {
  constructor(private http: HttpClient,private sharedDataService: SharedDataService) { }
  stock_ticker:string = ''
  dataSource: TableData[] = []
  company_name:string = ''
  ngAfterViewInit(): void {
   
     var stockticker =  this.sharedDataService.stock_ticker 
      if (stockticker!='')
      {
        this.onobtain(stockticker)
      }
  
  }
  @Input() searchEvent:EventEmitter<string> = new EventEmitter<string>();
  async onobtain(input:string)
  {
    const trimmedValue = input.split(' |')[0];
    const upperCaseValue = trimmedValue.toUpperCase();
    this.stock_ticker = upperCaseValue
    var response :any = ''
    var apiUrl = `/insider?stock_ticker=${upperCaseValue}`
    try {
      response = await this.http.get(apiUrl).toPromise();
      }
    catch (error) {
     console.error(' IS THIS THE Error:', error);
    }
    var result = response.data
    var positive_mspr = 0
    var negative_mspr = 0
    var other_mspr = 0
    var total_mspr = 0
    for (let i = 0; i < result.length; i++) {
      let obj = result[i];
      if (obj.mspr > 0)
      {
        positive_mspr = positive_mspr+ obj.mspr
      }
      else if (obj.mspr < 0)
      {
        negative_mspr = negative_mspr + obj.mspr
      }
      else
      {
        other_mspr = other_mspr + obj.mspr
      }
  }
  total_mspr = positive_mspr+negative_mspr+other_mspr
    var positive_change = 0
    var negative_change = 0
    var other_change = 0
    var total_change = 0
    for (let i = 0; i < result.length; i++) {
      let obj = result[i];
      if (obj.change > 0)
      {
        positive_change = positive_change+ obj.change
      }
      else if (obj.change < 0)
      {
        negative_change = negative_change + obj.change
      }
      else
      {
        other_change = other_change + obj.change
      }
  } 
    var total_change = positive_change+negative_change+other_change

    this.dataSource = [
      { rowHeader: 'Total', column1: String(total_mspr), column2: String(total_change) },
    { rowHeader: 'Positive', column1: String(positive_mspr), column2: String(positive_change) },
    { rowHeader:'Negative', column1: String(negative_mspr), column2: String(negative_change) }
    ]
    var apiUrl = `/recom?stock_ticker=${upperCaseValue}`
    try {
      response = await this.http.get(apiUrl).toPromise();
      }
    catch (error) {
     console.error(' IS THIS THE Error:', error);
    }

   var dates = []
   var strong_sell = []
   var sell = []
   var hold = []
   var buy = []
   var strong_buy = []
   for(let i = 0 ; i < response.length; i++)
   {
    dates.push(response[i].period)
    strong_sell.push(response[i].strongSell)
    sell.push(response[i].sell)
    hold.push(response[i].hold)
    buy.push(response[i].buy)
    strong_buy.push(response[i].strongBuy)
   }
    var chartoptions:Highcharts.Options =  {
      chart: {
        type: 'column',
        backgroundColor:'#f7f7f7'
      },
      title: {
        text: 'Recommendation Trends'
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Analysis'
        },
      },
      legend: {
        enabled: true
      },
      tooltip:{
        headerFormat:'<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
      },
      plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                inside: true,
            }
        }
    },
      series: [{
        type: 'column',
        name: 'Strong Buy',
        data: strong_buy,
        color: '#1a6334'
      },{
        type: 'column',
        name: 'Buy',
        data: buy,
        color: '#24af51'
      },{
        type: 'column',
        name: 'Hold',
        data: hold,
        color: '#b07e28'
      },{
        type: 'column',
        name: 'Sell',
        data: sell,
        color: '#f15255'
      },{
        type: 'column',
        name: 'Strong Sell',
        data: strong_sell,
        color: '#752b2c'
      }]
    }
    Highcharts.chart('recomchart',chartoptions);
    var apiUrl = `/earnings?stock_ticker=${upperCaseValue}`
    try {
      response = await this.http.get(apiUrl).toPromise();
      }
    catch (error) {
     console.error(' IS THIS THE Error:', error);
    }
    var actual = []
    var estimate = []
    var x_axis = []
    for(let i = 0; i < response.length; i++)
    {
      actual.push(response[i].actual)
      estimate.push(response[i].estimate)
      let x_axis_val = response[i].period + '<br/>Surprise:'+response[i].surprise
      x_axis.push(x_axis_val)
    }
    chartoptions ={
      chart: {
        backgroundColor:'#f7f7f7'
      },
      title: {
        text: 'Historical EPS Surprises'
      },
      yAxis: {
        title: {
          text: 'Quaterly EPS'
        },
      },
      legend: {
        enabled: true
      },
      xAxis: {
        categories: x_axis
      },
      tooltip: {
        headerFormat: '<b>{point.key}</b><br/>', 
        shared:true
    },
    series: [{
      type: 'line',
      name: 'Actual',
      data: actual,
   
    },{
      type: 'line',
      name: 'Estimate',
      data: estimate,
   
    }]
    }
    Highcharts.chart('historicaleps',chartoptions);
  }
  getcomapnyname(companyname:string)
  {
    this.company_name = companyname
  }
}
