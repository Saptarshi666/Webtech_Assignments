import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements AfterViewInit {
  isNewsAvailable:boolean=false
  isNewsAvailable1:boolean=false
  isNewsAvailable2:boolean=false
  isNewsAvailable3:boolean=false
  isNewsAvailable4:boolean=false
  isNewsAvailable5:boolean=false
  isNewsAvailable6:boolean=false
  isNewsAvailable7:boolean=false
  isNewsAvailable8:boolean=false
  isNewsAvailable9:boolean=false
  isNewsAvailable10:boolean=false
  isNewsAvailable11:boolean=false
  isNewsAvailable12:boolean=false
  isNewsAvailable13:boolean=false
  isNewsAvailable14:boolean=false
  isNewsAvailable15:boolean=false
  isNewsAvailable16:boolean=false
  isNewsAvailable17:boolean=false
  isNewsAvailable18:boolean=false
  isNewsAvailable19:boolean=false
  isNewsAvailable20:boolean=false
  news: any
  source:string = ''
  datetime:string = ''
  title:string = ''
  Summary:string = ''
  weburl:string = ''
  ngAfterViewInit(): void {
    this.onobtain(this.sharedDataService.stock_ticker)
   /*  this.sharedDataService.searchEvent$.subscribe((searchTerm: string) => {
      console.log("THIS IS THE SEARCHTERM",searchTerm)
      if(searchTerm !='')
      this.onobtain(searchTerm)
    }); */
 
 }
  @Input() searchEvent:EventEmitter<string> = new EventEmitter<string>();
  constructor(private http: HttpClient,private modalService: NgbModal,private sharedDataService: SharedDataService) { }
  async onobtain(input:string)
{
  const trimmedValue = input.split(' |')[0];
  const upperCaseValue = trimmedValue.toUpperCase();
  var response :any = ''
  var apiUrl = `/news?stock_ticker=${upperCaseValue}`
  try {
     response = await this.http.get(apiUrl).toPromise();
  }
  catch (error) {
    console.error('Error:', error);
  }
  const requiredFields = ["image", "headline", "datetime", "url","source","summary"];
  const json_doc_array = response.filter((document: any) => {
    for (const field of requiredFields) {
      if (!document.hasOwnProperty(field) || document[field] === null || document[field] === undefined || document[field] === '') {
        return false;
      }
    }
    return true;
  });
  const news_articles = [];
  for (const document of json_doc_array) {
    if (news_articles.length >= 20) {
      break;
    } else {
      news_articles.push(document);
    }
  }
  this.news = news_articles
  this.isNewsAvailable = true
  this.isNewsAvailable1 =true
  this.isNewsAvailable2 =true
  this.isNewsAvailable3 =true
  this.isNewsAvailable4 =true
  this.isNewsAvailable5 =true
  this.isNewsAvailable6 =true
  this.isNewsAvailable7 =true
  this.isNewsAvailable8 =true
  this.isNewsAvailable9 =true
  this.isNewsAvailable10 =true
  this.isNewsAvailable11 =true
  this.isNewsAvailable12 =true
  this.isNewsAvailable13 =true
  this.isNewsAvailable14 =true
  this.isNewsAvailable15 =true
  this.isNewsAvailable16 =true
  this.isNewsAvailable17 =true
  this.isNewsAvailable18 =true
  this.isNewsAvailable19 =true
  this.isNewsAvailable20 =true
 
          if (news_articles.length >=1)
          {
            this.isNewsAvailable = true
            this.isNewsAvailable1 =true
          }
          else{
            this.isNewsAvailable = false
            this.isNewsAvailable1 =false
            this.isNewsAvailable2 =false
            this.isNewsAvailable3 =false
            this.isNewsAvailable4 =false
            this.isNewsAvailable5 =false
            this.isNewsAvailable6 =false
            this.isNewsAvailable7 =false
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=2)
          {
            this.isNewsAvailable2 =true
          }
          else{
            this.isNewsAvailable2 =false
            this.isNewsAvailable3 =false
            this.isNewsAvailable4 =false
            this.isNewsAvailable5 =false
            this.isNewsAvailable6 =false
            this.isNewsAvailable7 =false
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=3)
          {
            this.isNewsAvailable3 =true
          }
          else{
            this.isNewsAvailable3 =false
            this.isNewsAvailable4 =false
            this.isNewsAvailable5 =false
            this.isNewsAvailable6 =false
            this.isNewsAvailable7 =false
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=4)
          {
            this.isNewsAvailable4 =true
          }
          else{
            this.isNewsAvailable4 =false
            this.isNewsAvailable5 =false
            this.isNewsAvailable6 =false
            this.isNewsAvailable7 =false
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=5)
          {
            this.isNewsAvailable5 =true
          }
          else{
            this.isNewsAvailable5 =false
            this.isNewsAvailable6 =false
            this.isNewsAvailable7 =false
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=6)
          {
            this.isNewsAvailable6 =true
          }
          else{
            this.isNewsAvailable6 =false
            this.isNewsAvailable7 =false
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=7)
          {
            this.isNewsAvailable7 =true
          }
          else{
            this.isNewsAvailable7 =false
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=8)
          {
            this.isNewsAvailable8 =true
          }
          else{
            this.isNewsAvailable8 =false
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=9)
          {
            this.isNewsAvailable9 =true
          }
          else{
            this.isNewsAvailable9 =false
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=10)
          {
            this.isNewsAvailable10 =true
          }
          else{
            this.isNewsAvailable10 =false
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=11)
          {
            this.isNewsAvailable11 =true
          }
          else{
            this.isNewsAvailable11 =false
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=12)
          {
            this.isNewsAvailable12 =true
          }
          else{
            this.isNewsAvailable12 =false
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=13)
          {
            this.isNewsAvailable13 =true
          }
          else{
            this.isNewsAvailable13 =false
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=14)
          {
            this.isNewsAvailable14 =true
          }
          else{
            this.isNewsAvailable14 =false
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=15)
          {
            this.isNewsAvailable15 =true
          }
          else{
            this.isNewsAvailable15 =false
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=16)
          {
            this.isNewsAvailable16 =true
          }
          else{
            this.isNewsAvailable16 =false
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=17)
          {
            this.isNewsAvailable17 =true
          }
          else{
            this.isNewsAvailable17 =false
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=18)
          {
            this.isNewsAvailable18 =true
          }
          else{
            this.isNewsAvailable18 =false
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=19)
          {
            this.isNewsAvailable19 =true
          }
          else{
            this.isNewsAvailable19 =false
            this.isNewsAvailable20 =false
          }
          if (news_articles.length >=20)
          {
            this.isNewsAvailable20 =true
          }
          else{
            this.isNewsAvailable20 =false
          }
}
movedown(flag:number)
{
  const News = document.querySelector('.News')
  if (News) {
    News.classList.add('move-down2');
  }
  if (flag == 1)
  {
    setTimeout(() => {
     
      if(News)
      {
        News.classList.remove('move-down2')
      }
    }, 3000);
  }
  else{
    setTimeout(() => {
     
      if(News)
      {
        News.classList.remove('move-down2')
      }
    },);
  }
}
shareOnTwitter() {
  const tweetText = `${this.title} ${this.weburl}`; 
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(twitterUrl, '_blank'); 
}
shareOnFacebook() {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.weburl)}`;

  window.open(facebookUrl, '_blank'); 
}
ExpandNews(newsModal:any,num:number)
{
  var news_to_Check = this.news[num]
  this.source = news_to_Check.source
  const date = new Date(news_to_Check.datetime*1000);
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${monthName} ${day}, ${year}`;
  this.datetime = formattedDate
  if(news_to_Check.headline.length> 90)
    {
      this.title = news_to_Check.headline.slice(0,90)+'...'
    }
  else{
    this.title = news_to_Check.headline
  }
  if(news_to_Check.summary.length > 190)
    {
      this.Summary = news_to_Check.summary.slice(0,190)+'...'
    }
  else
  {
    this.Summary = news_to_Check.summary
  }

  this.weburl = news_to_Check.url
  this.modalService.open(newsModal, { windowClass: 'modal-top' });
}
}

