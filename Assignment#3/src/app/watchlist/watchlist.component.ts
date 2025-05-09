import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements AfterViewInit{
  @ViewChild('watchlistitems', { static: true }) watchlistItems!: ElementRef;
  stock_ticker :any
  storedResponses: any;
  responsesReady: boolean = false;
  valuesindatabase:any
  isDataLoaded:boolean= false
  showAlert:boolean = false;
  alertMessage:string = '';
  colorofalert:boolean = false
  async ngAfterViewInit(): Promise<void> {
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
       console.log(newDataObject[0])
       this.valuesindatabase = newDataObject[0]
       if (this.valuesindatabase.length == 0)
       {
        this.showAlert = true
        this.colorofalert = true
       }
       const observables = this.fetchMultipleStockData(newDataObject[0]);
    
       const promise = forkJoin(observables).toPromise();
       try {
        this.storedResponses = await promise; 
        this.responsesReady = true; 
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
      console.log("this.storedResponses 4", this.storedResponses)    
      this.isDataLoaded = true
  }
/*   createDivs(): void {
    if (this.responsesReady) {
      this.storedResponses.forEach((_stockData: any) => {
        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'watchlist-item');
        this.renderer.addClass(div, 'card');
        let marginTop = '4%';
        this.renderer.setStyle(div, 'width', '960px');
        this.renderer.setStyle(div, 'margin-top', marginTop);
    
        // Create cross icon
        const cross = this.renderer.createElement('span');
        this.renderer.addClass(cross, 'cross');
        this.renderer.addClass(cross, 'close');
        this.renderer.setProperty(cross, 'innerHTML', '&times;');
        this.renderer.listen(cross, 'click', () => {
          this.removeDiv(div);
        });
        this.renderer.appendChild(div, cross);
    
        // Create card body
        const cardBody = this.renderer.createElement('div');
        this.renderer.addClass(cardBody, 'card-body');
        
        // Create text elements
        const text1 = this.renderer.createText('First line of text');
        const br1 = this.renderer.createElement('br');
        const text2 = this.renderer.createText('Second line of text');
        const br2 = this.renderer.createElement('br');
        const text3 = this.renderer.createText('Third line of text');
        const text4 = this.renderer.createText('Fourth line of text');
        
        // Append text elements to card body
        this.renderer.appendChild(cardBody, text1);
        this.renderer.appendChild(cardBody, br1);
        this.renderer.appendChild(cardBody, text2);
        this.renderer.appendChild(cardBody, br2);
        this.renderer.appendChild(cardBody, text3);
        this.renderer.appendChild(cardBody, text4);
        
        // Append card body to div
        this.renderer.appendChild(div, cardBody);
    
        // Append the created div to the parent container
        this.renderer.appendChild(this.watchlistItems.nativeElement, div);
    
        // Set styles for the cross icon
        setTimeout(() => {
          this.renderer.setStyle(cross, 'cursor', 'pointer');
          this.renderer.setStyle(cross, 'position', 'absolute');
          this.renderer.setStyle(cross, 'top', '0');
          this.renderer.setStyle(cross, 'right', '0');
        });
    
        marginTop = '20px'; // Update marginTop for next iteration
      });
    }    
  } */
  
  async removeDiv(index: number) {
    var input = this.valuesindatabase[index]
    this.valuesindatabase.splice(index, 1);
    this.storedResponses.splice(index,1);
    var apiUrl = `/remove_watchlist?stock_ticker=${input}`
    var response:any
      try {
        response = await this.http.get(apiUrl).toPromise();
        }
      catch (error) {
       console.error(' IS THIS THE Error:', error);
      }
      if (this.storedResponses.length == 0)
      {
        this.showSelfClosingWatchlistAlert()
      }
  }

  fetchMultipleStockData(stockTickers: string[]): Observable<any>[] {
    return stockTickers.map(ticker => this.fetchStockData(ticker));
  }
  fetchStockData(stockTicker: string): Observable<any> {
    return this.http.get<any>(`/quotes?stock_ticker=${stockTicker}`);
  }
  constructor(private http: HttpClient,private renderer: Renderer2,private router: Router,private shareddataservice:SharedDataService) { }
  async add( input:string){
  console.log(input)
  var apiUrl = `/add_watchlist?stock_ticker=${input}`
  var response:any
    try {
      response = await this.http.get(apiUrl).toPromise();
      }
    catch (error) {
     console.error(' IS THIS THE Error:', error);
    }
}
delete( input:string){
  console.log(input)
}
handleDivClick(i:number)
{
var stock_ticker = this.valuesindatabase[i]
this.router.navigateByUrl("/search/"+stock_ticker);
this.shareddataservice.ticker = stock_ticker

}
calculateMarginLeft(item:number):number
{
  const width = item.toString().length * 7; 
  return width + 5;
}
showSelfClosingWatchlistAlert(): void {
    this.alertMessage = "Currently you don't have any stocker in your watchlist.";
    this.colorofalert = true;
  this.showAlert = true;
}


}
