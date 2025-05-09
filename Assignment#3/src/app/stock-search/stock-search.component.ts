import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css'],
})
export class StockSearchComponent implements OnInit {
  searchData:string = ''
  alertMessage: string = '';
  colorofalert:boolean = true;
  valid_ticker:boolean = false;
  ngOnInit(): void {
    this.sharedDataService.getSearchData().subscribe((data: string) => {
      this.searchData = data;
    });
    if (this.searchData != '')
    {
      this.sharedDataService.setSearchData(this.searchData);
      this.router.navigateByUrl("/search/"+this.searchData);
    }
  }
  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;
  showSpinner: boolean = false;
  showDropdown: boolean = false;
  showstocksearch: boolean = true
  @Output() searchEvent:EventEmitter<string> = new EventEmitter<string>();
  selectedItem: string = '';
  showAlert:boolean = false

  handleItemClick(item: string): void {
    this.searchControl.setValue(item) 
    let clickEvent: Event;
    clickEvent = new MouseEvent('click');
    this.SearchInput(clickEvent)
  }
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient,private router: Router,private sharedDataService: SharedDataService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => {
        if (value === '') {
          this.showDropdown = false;
          this.showSpinner = false;
          this.loadingSubject.next(false);
          return of([]);
        }
        this.showSpinner = true;
        this.loadingSubject.next(true);
        return this.getAutocompleteResults(value).pipe(
          startWith([]),
          map((response: string[]) => {
            if (response.length === 0) {
              this.valid_ticker = false
            } else {
              this.valid_ticker = true
            }
            return response; // Return the original response
          }),
          finalize(() => {
            this.showSpinner = false; 
            this.loadingSubject.next(false);
          })
        );
      })
    );
  }

  getAutocompleteResults(value: string): Observable<string[]> {
  this.loadingSubject.next(true); 
  this.showSpinner = true; 
    return this.http.get<any>(`/autocomplete?stock_ticker=${value}`).pipe(
      map((response: any) => {
        this.loadingSubject.next(false);
        this.showSpinner = false;
        this.showDropdown = true;
        return response.result
          .filter((item: any) => item.type === 'Common Stock' && !item.displaySymbol.includes('.'))
          .map((item: any) => `${item.displaySymbol} | ${item.description}`);
      }),
     
    );
  }
  setSearchControlValue(value: string): void {
    console.log("THIS IS SEARCHCONTROLVALUE",value)
    this.searchControl.setValue(value);
  }
  public async SearchInput(event?: Event): Promise<void> {
    if (event instanceof KeyboardEvent) {
      event.preventDefault();
    }
    const inputValue = this.searchControl.value;
    const trimmedValue = inputValue.split(' |')[0];
    const upperCaseValue = trimmedValue.toUpperCase();
    if (inputValue !='' && this.valid_ticker == true )
    {this.searchControl.setValue(upperCaseValue)
    this.sharedDataService.stock_ticker = upperCaseValue
    this.sharedDataService.ticker = upperCaseValue
    this.showAlert = false
    this.router.navigateByUrl("/search/"+upperCaseValue);
    this.searchEvent.emit(upperCaseValue)
    this.sharedDataService.stock_ticker = upperCaseValue
    this.sharedDataService.emitSearchEvent(upperCaseValue)
    }
    else
    {
      this.router.navigateByUrl("/search/home")
      this.showAlert = true
    }
  }
  Cancel()
  {
    this.router.navigateByUrl("/search/home")
  }
}