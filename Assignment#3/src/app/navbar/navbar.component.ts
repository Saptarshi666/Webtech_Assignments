import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { EMPTY, catchError, take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchData: string = '';
  ngOnInit(): void {
    this.sharedDataService.getSearchData().subscribe((data: string) => {
      this.searchData = data;
    });
  }
  constructor(private router: Router,private sharedDataService: SharedDataService) {}
  stock_ticker:string = ''
  receiveDataFromStockSearch(input:string)
  {
    this.stock_ticker = input
  }
  openSearch()
  {
    var item = this.sharedDataService.stock_ticker    
    this.sharedDataService.ticker = ''
    if (item != '')
    {
      this.router.navigateByUrl("/search/"+item);
    }
    else
    {
      this.router.navigateByUrl("/search/home")
    }

  }

 openWatchlist()
 {
  this.router.navigateByUrl("/watchlist");
 }
 openPortfolio()
 {
  this.router.navigate(['/portfolio']);
 }
}
