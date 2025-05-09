import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import{SearchSummaryComponent} from './search-summary/search-summary.component'
import{PortfolioComponent} from'./portfolio/portfolio.component'
import{StockSearchComponent} from './stock-search/stock-search.component'

export const routes: Routes = [
  { path: '', redirectTo: 'search/home', pathMatch: 'full' },
  { path: 'search/home', component: StockSearchComponent},
  { path: 'search/:ticker', component: SearchSummaryComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [StockSearchComponent,SearchSummaryComponent,WatchlistComponent,PortfolioComponent]
