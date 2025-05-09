import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import indicators from 'highcharts/indicators/indicators';
import VBP from 'highcharts/indicators/volume-by-price'
import { SharedDataService } from '../shared-data.service';
indicators(Highcharts);
VBP(Highcharts)


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit,AfterViewInit {
  shouldchartbeshown:boolean =true
  @Input() searchEvent:EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
      this.shouldchartbeshown = true
  }
  ngAfterViewInit(): void {
    this.onobtain(this.sharedDataService.stock_ticker)
 
 }
  constructor(private http: HttpClient,private sharedDataService: SharedDataService) { }
  async onobtain(input:string)
  {
    const trimmedValue = input.split(' |')[0];
    const upperCaseValue = trimmedValue.toUpperCase();
    var response :any = ''
    var apiUrl = `/Charts?stock_ticker=${upperCaseValue}`
    try {
      response = await this.http.get(apiUrl).toPromise();
      }
    catch (error) {
     console.error(' IS THIS THE Error:', error);
    }
    var data:any
    data = response.results
  
        const ohlc = [];
        const volume = [];
        const dataLength = data.length;
        const groupingUnits: [string, number[]][] = [
          ['week', [1]],
          ['month', [1, 2, 3, 4, 6]]
        ];
        for (let i = 0; i < dataLength; i += 1) {
          ohlc.push([
              data[i].t, 
              data[i].o, 
              data[i].h,
              data[i].l, 
              data[i].c
          ]);
    
          volume.push([
              data[i].t, 
              data[i].v 
          ]);
      }
      var title = upperCaseValue+' Historical'
      var lowercase = upperCaseValue.toLowerCase()
      this.createChart(ohlc, volume, groupingUnits,title,lowercase,upperCaseValue);
}
createChart(ohlc: any[], volume: any[], groupingUnits: [string, number[]][],title:string,lowercase:string,uppercase:string) {
    Highcharts.stockChart('container', {
      chart:{
        backgroundColor:'#f7f7f7'
    },
      rangeSelector: {
        selected: 2
      },
      title: {
        text: title
      },
      subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
      },
      yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      tooltip: {
        split: true
      },
      plotOptions: {
        series: {
          dataGrouping: {
            units: [['day', [1]]] 
          }
        }
      },
      series: [{
        type: 'candlestick',
        name: uppercase,
        id: lowercase,
        zIndex: 2,
        data: ohlc
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: volume,
        yAxis: 1
      }, {
        type: 'vbp',
        linkedTo: lowercase,
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      }, {
        type: 'sma',
        linkedTo: lowercase,
        zIndex: 1,
        marker: {
          enabled: false
        }
      }]
    });
  }
}