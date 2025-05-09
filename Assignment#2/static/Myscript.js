function handleKeyPress(event)
{
  
  if (event.key === 'Enter')
  {
    event.preventDefault();
    SearchInput();
  }
}

function clearSearch() {
   setTimeout(() =>{document.querySelector('.search-bar').value = '';
   document.querySelector('.Error-container').style.visibility = "hidden";
  document.querySelector('.tab').style.visibility ="hidden";
  document.getElementById('CompImage').style.visibility = "hidden";
  document.querySelector('.Table').style.visibility = "hidden";
  document.querySelector('.StockTable').style.visibility = "hidden";
  document.getElementById('chartcontainer').style.visibility = "hidden";
  document.querySelector('.News').style.visibility = "hidden";
  document.querySelector('.News1').style.visibility = "hidden";
  document.querySelector('.News2').style.visibility = "hidden";
  document.querySelector('.News3').style.visibility = "hidden";
  document.querySelector('.News4').style.visibility = "hidden";
  document.querySelector('.News5').style.visibility = "hidden";
},0);
  }
  function clearSearch1() {
  setTimeout(() =>{
   document.querySelector('.tab').style.visibility ="hidden";
   document.getElementById('CompImage').style.visibility = "hidden";
   document.querySelector('.Table').style.visibility = "hidden";
   document.querySelector('.StockTable').style.visibility = "hidden";
   document.getElementById('chartcontainer').style.visibility = "hidden";
   document.querySelector('.News').style.visibility = "hidden";
   document.querySelector('.News1').style.visibility = "hidden";
   document.querySelector('.News2').style.visibility = "hidden";
   document.querySelector('.News3').style.visibility = "hidden";
   document.querySelector('.News4').style.visibility = "hidden";
   document.querySelector('.News5').style.visibility = "hidden";
   document.querySelector('.Error-container').style.visibility = "visible";
 },0);
   }
function populateCompany()
{
  document.querySelector('.Error-container').style.visibility = "hidden";
  document.querySelector('.wrapper').style.visibility = "visible";
  document.querySelector('.tab').style.visibility ="visible";
  document.getElementById('CompImage').style.visibility = "visible";
  document.querySelector('.Table').style.visibility = "visible";
  document.querySelector('.StockTable').style.visibility = "hidden";
  document.getElementById('chartcontainer').style.visibility = "hidden";
  document.querySelector('.News').style.visibility = "hidden";
  document.querySelector('.News1').style.visibility = "hidden";
  document.querySelector('.News2').style.visibility = "hidden";
  document.querySelector('.News3').style.visibility = "hidden";
  document.querySelector('.News4').style.visibility = "hidden";
  document.querySelector('.News5').style.visibility = "hidden";
  document.querySelector('.company-button').style.backgroundColor = '#ccc';
  document.querySelector('.stocksummary-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.charts-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.latestnews-button').style.backgroundColor = '#f5f5f5';

}
function populateStock()
{
  document.querySelector('.Error-container').style.visibility = "hidden";
  document.querySelector('.wrapper').style.visibility = "visible";
  document.querySelector('.tab').style.visibility ="visible";
  document.getElementById('CompImage').style.visibility = "hidden";
  document.querySelector('.Table').style.visibility = "hidden";
  document.querySelector('.StockTable').style.visibility = "visible";
  document.getElementById('chartcontainer').style.visibility = "hidden";
  document.querySelector('.News').style.visibility = "hidden";
  document.querySelector('.News1').style.visibility = "hidden";
  document.querySelector('.News2').style.visibility = "hidden";
  document.querySelector('.News3').style.visibility = "hidden";
  document.querySelector('.News4').style.visibility = "hidden";
  document.querySelector('.News5').style.visibility = "hidden";
  document.querySelector('.company-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.stocksummary-button').style.backgroundColor = '#ccc';
  document.querySelector('.charts-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.latestnews-button').style.backgroundColor = '#f5f5f5';
}
function populateChart()
{
  document.querySelector('.Error-container').style.visibility = "hidden";
  document.querySelector('.wrapper').style.visibility = "visible";
  document.querySelector('.tab').style.visibility ="visible";
  document.getElementById('CompImage').style.visibility = "hidden";
  document.querySelector('.Table').style.visibility = "hidden";
  document.querySelector('.StockTable').style.visibility = "hidden";
  document.getElementById('chartcontainer').style.visibility = "visible";
  document.querySelector('.News').style.visibility = "hidden";
  document.querySelector('.News1').style.visibility = "hidden";
  document.querySelector('.News2').style.visibility = "hidden";
  document.querySelector('.News3').style.visibility = "hidden";
  document.querySelector('.News4').style.visibility = "hidden";
  document.querySelector('.News5').style.visibility = "hidden";
  document.querySelector('.company-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.stocksummary-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.charts-button').style.backgroundColor = '#ccc';
  document.querySelector('.latestnews-button').style.backgroundColor = '#f5f5f5';
}
function populateNews()
{
  var news1 = document.querySelector('.News1')
  var news2 = document.querySelector('.News2')
  var news3 = document.querySelector('.News3')
  var news4 = document.querySelector('.News4')
  var news5 = document.querySelector('.News5')
  document.querySelector('.Error-container').style.visibility = "hidden";
  document.querySelector('.wrapper').style.visibility = "visible";
  document.querySelector('.tab').style.visibility ="visible";
  document.getElementById('CompImage').style.visibility = "hidden";
  document.querySelector('.Table').style.visibility = "hidden";
  document.querySelector('.StockTable').style.visibility = "hidden";
  document.getElementById('chartcontainer').style.visibility = "hidden";
  document.querySelector('.News').style.visibility = "visible";
  if (news1.innerHTML != '')
    {
      document.querySelector('.News1').style.visibility = "visible";
    }
    if (news2.innerHTML != '')
    {
      document.querySelector('.News2').style.visibility = "visible";
    }
    if (news3.innerHTML != '')
    {
      document.querySelector('.News3').style.visibility = "visible";
    }
    if (news4.innerHTML != '')
    {
      document.querySelector('.News4').style.visibility = "visible";
    }
    if (news5.innerHTML != '')
    {
      document.querySelector('.News5').style.visibility = "visible";
    }
  document.querySelector('.company-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.stocksummary-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.charts-button').style.backgroundColor = '#f5f5f5';
  document.querySelector('.latestnews-button').style.backgroundColor = '#ccc';
}
  function simulateClick(element) {
    var event = new MouseEvent('click',{
      bubbles:true,
      cancelable:true,
    });
    element.dispatchEvent(event)
  }
  async function fetchNewsData(url)
  {
    var response = ''
    var response_json = ''
    response = await fetch(url);
    response_json =  await response.json();
    var check1 = Object.keys(response_json).length === 0 && response_json.constructor === Object
   
    requiredFields = ["image","headline","datetime","url"]
    json_doc_array = response_json.filter(document=>{
      for (const field of requiredFields){
        if(!document.hasOwnProperty(field)|| document[field] === null || document[field]=== undefined || document[field] === ''){
          return false
        }
      }
      return true;
    });
    const news_articles =[]
    for (const document of json_doc_array){
      if(news_articles.length >= 5)
      {
        break;
      }
      else{
        news_articles.push(document)
      }
    }
    var news1 = document.querySelector('.News1')
    var news2 = document.querySelector('.News2')
    var news3 = document.querySelector('.News3')
    var news4 = document.querySelector('.News4')
    var news5 = document.querySelector('.News5')
    if (news_articles.length >=1)
    {
      
    var imageNode = document.createElement("img");
    imageNode.src = news_articles[0]['image']
    imageNode.style.height = "100px"
    imageNode.style.width = "100px"
    imageNode.style.marginTop = "10px"
    imageNode.style.marginLeft = "10px"
    var headline = document.createElement("p");
    if (news_articles[0]["headline"].length > 115)
      {
        headline.textContent = news_articles[0]["headline"].substr(0,115)+'...'
      }
    else{
      headline.textContent = news_articles[0]["headline"]
    }
    headline.style.height = "10px"
    headline.style.fontWeight = "bold"
    headline.style.fontSize = "15px"
     headline.style.marginTop = "-105px"
    headline.style.marginLeft = "130px"
    var timestamp = news_articles[0]["datetime"] * 1000
    var dateObject = new Date(timestamp)
    var day = dateObject.toLocaleDateString('en-GB',{day:'numeric'});
    var month = dateObject.toLocaleDateString('en-GB',{month:'long'});
    var year = dateObject.toLocaleDateString('en-GB',{year:'numeric'});
    var formatteddate = day + ' '+ month+', ' + year
    var date = document.createElement("p");
    date.textContent = formatteddate
    date.style.fontSize = "14px"
    date.style.marginTop = "-9px"
    date.style.height = "0px"
    date.style.marginLeft = "130px"  
    var linkNode = document.createElement("a");
    linkNode.href = news_articles[0]["url"];
    linkNode.target = "_blank";
    linkNode.textContent = "See Original Post";
   linkNode.style.fontSize = "13px"
   linkNode.style.marginTop = "-100px";
   linkNode.style.marginLeft = "130px"
   news1.innerHTML = ''
    news1.appendChild(imageNode)
    news1.appendChild(headline) 
    news1.appendChild(date)
    news1.appendChild(linkNode)
  }
    else{
      news1.innerHTML = ''
      document.querySelector('.News1').style.visibility = "hidden";
      document.querySelector('.News2').style.visibility = "hidden";
      document.querySelector('.News3').style.visibility = "hidden";
      document.querySelector('.News4').style.visibility = "hidden";
      document.querySelector('.News5').style.visibility = "hidden";
    }
    if(news_articles.length >=2)
    {
    
    var imageNode1 = document.createElement("img");
    imageNode1.src = news_articles[1]['image']
    imageNode1.style.height = "100px"
    imageNode1.style.width = "100px"
    imageNode1.style.marginTop = "10px"
    imageNode1.style.marginLeft = "10px"
    var headline1 = document.createElement("p");
    if (news_articles[1]["headline"].length > 115)
      {
        headline1.textContent = news_articles[1]["headline"].substr(0,115)+'...'
      }
    else{
      headline1.textContent = news_articles[1]["headline"]
    }
    headline1.style.height = "10px"
    headline1.style.fontWeight = "bold"
    headline1.style.fontSize = "15px"
     headline1.style.marginTop = "-105px"
    headline1.style.marginLeft = "130px"
    var timestamp1 = news_articles[1]["datetime"] * 1000
    var dateObject1 = new Date(timestamp1)
    var day = dateObject1.toLocaleDateString('en-GB',{day:'numeric'});
    var month = dateObject1.toLocaleDateString('en-GB',{month:'long'});
    var year = dateObject1.toLocaleDateString('en-GB',{year:'numeric'});
    var formatteddate1 = day + ' '+ month+', ' + year
    var date1 = document.createElement("p");
    date1.textContent = formatteddate1
    date1.style.fontSize = "14px"
    date1.style.height = "0px"
    date1.style.marginTop = "-9px"
    date1.style.marginLeft = "130px"  
    var linkNode1 = document.createElement("a");
    linkNode1.href = news_articles[1]["url"];
    linkNode1.target = "_blank";
    linkNode1.textContent = "See Original Post";
   linkNode1.style.fontSize = "13px"
   linkNode1.style.marginLeft = "130px"
   news2.innerHTML = ''
    news2.appendChild(imageNode1)
    news2.appendChild(headline1) 
    news2.appendChild(date1)
    news2.appendChild(linkNode1)
  }
  else{
    news2.innerHTML = ''
  document.querySelector('.News2').style.visibility = "hidden";
  document.querySelector('.News3').style.visibility = "hidden";
  document.querySelector('.News4').style.visibility = "hidden";
  document.querySelector('.News5').style.visibility = "hidden";
  }
    if (news_articles.length >=3)
    {
      
    var imageNode2 = document.createElement("img");
    imageNode2.src = news_articles[2]['image']
    imageNode2.style.height = "100px"
    imageNode2.style.width = "100px"
    imageNode2.style.marginTop = "10px"
    imageNode2.style.marginLeft = "10px"
    var headline2 = document.createElement("p");
    if (news_articles[2]["headline"].length > 115)
      {
        headline2.textContent = news_articles[2]["headline"].substr(0,115)+'...'
      }
    else{
      headline2.textContent = news_articles[2]["headline"]
    }
    headline2.style.height = "10px"
    headline2.style.fontWeight = "bold"
    headline2.style.fontSize = "15px"
     headline2.style.marginTop = "-105px"
    headline2.style.marginLeft = "130px"
    var timestamp2 = news_articles[2]["datetime"] * 1000
    var dateObject2 = new Date(timestamp2)
    var day = dateObject2.toLocaleDateString('en-GB',{day:'numeric'});
    var month = dateObject2.toLocaleDateString('en-GB',{month:'long'});
    var year = dateObject2.toLocaleDateString('en-GB',{year:'numeric'});
    var formatteddate2 = day + ' '+ month+', ' + year
    var date2 = document.createElement("p");
    date2.textContent = formatteddate2
    date2.style.fontSize = "14px"
    date2.style.marginTop = "-9px"
    date2.style.height = "0px"
    date2.style.marginLeft = "130px"  
    var linkNode2 = document.createElement("a");
    linkNode2.href = news_articles[2]["url"];
    linkNode2.target = "_blank";
    linkNode2.textContent = "See Original Post";
   linkNode2.style.fontSize = "13px"
   linkNode2.style.marginLeft = "130px"
   news3.innerHTML = ''
    news3.appendChild(imageNode2)
    news3.appendChild(headline2) 
    news3.appendChild(date2)
    news3.appendChild(linkNode2)
  }
  else{
    news3.innerHTML = ''
  document.querySelector('.News3').style.visibility = "hidden";
  document.querySelector('.News4').style.visibility = "hidden";
  document.querySelector('.News5').style.visibility = "hidden";
  }
    if(news_articles.length >=4)
    {
      
    var imageNode3 = document.createElement("img");
    imageNode3.src = news_articles[3]['image']
    imageNode3.style.height = "100px"
    imageNode3.style.width = "100px"
    imageNode3.style.marginTop = "10px"
    imageNode3.style.marginLeft = "10px"
    var headline3 = document.createElement("p");
    if (news_articles[3]["headline"].length > 115)
      {
        headline3.textContent = news_articles[3]["headline"].substr(0,115)+'...'
      }
    else{
      headline3.textContent = news_articles[3]["headline"]
    }
    headline3.style.height = "10px"
    headline3.style.fontWeight = "bold"
    headline3.style.fontSize = "15px"
     headline3.style.marginTop = "-105px"
    headline3.style.marginLeft = "130px"
    var timestamp3 = news_articles[3]["datetime"] * 1000
    var dateObject3 = new Date(timestamp3)
    var day = dateObject3.toLocaleDateString('en-GB',{day:'numeric'});
    var month = dateObject3.toLocaleDateString('en-GB',{month:'long'});
    var year = dateObject3.toLocaleDateString('en-GB',{year:'numeric'});
    var formatteddate3 = day + ' '+ month+', ' + year
    var date3 = document.createElement("p");
    date3.textContent = formatteddate3
    date3.style.fontSize = "14px"
    date3.style.marginTop = "-9px"
    date3.style.height = "0px"
    date3.style.marginLeft = "130px"  
    var linkNode3 = document.createElement("a");
    linkNode3.href = news_articles[3]["url"];
    linkNode3.target = "_blank";
    linkNode3.textContent = "See Original Post";
   linkNode3.style.fontSize = "13px"
   linkNode3.style.marginLeft = "130px"
   news4.innerHTML = ''
    news4.appendChild(imageNode3)
    news4.appendChild(headline3) 
    news4.appendChild(date3)
    news4.appendChild(linkNode3)
  }
  else
  {
    news4.innerHTML = ''
  document.querySelector('.News4').style.visibility = "hidden";
  document.querySelector('.News5').style.visibility = "hidden";
  }
    if (news_articles.length >=5)
    {
      
    var imageNode4 = document.createElement("img");
    imageNode4.src = news_articles[4]['image']
    imageNode4.style.height = "100px"
    imageNode4.style.width = "100px"
    imageNode4.style.marginTop = "10px"
    imageNode4.style.marginLeft = "10px"
    var headline4 = document.createElement("p");
    if (news_articles[4]["headline"].length > 115)
    {
      headline4.textContent = news_articles[4]["headline"].substr(0,115)+'...'
    }
  else{
    headline4.textContent = news_articles[4]["headline"]
  }
    headline4.style.height = "10px"
    headline4.style.fontWeight = "bold"
    headline4.style.fontSize = "15px"
     headline4.style.marginTop = "-105px"
    headline4.style.marginLeft = "130px"
    var timestamp4 = news_articles[4]["datetime"] * 1000
    var dateObject4 = new Date(timestamp4)
    var day = dateObject4.toLocaleDateString('en-GB',{day:'numeric'});
    var month = dateObject4.toLocaleDateString('en-GB',{month:'long'});
    var year = dateObject4.toLocaleDateString('en-GB',{year:'numeric'});
    var formatteddate4 = day + ' '+ month+', ' + year
    var date4 = document.createElement("p");
    date4.textContent = formatteddate4
    date4.style.fontSize = "14px"
    date4.style.marginTop = "-9px"
    date4.style.height = "0px"
    date4.style.marginLeft = "130px"  
    var linkNode4 = document.createElement("a");
    linkNode4.href = news_articles[4]["url"];
    linkNode4.target = "_blank";
    linkNode4.textContent = "See Original Post";
   linkNode4.style.fontSize = "13px"
   linkNode4.style.marginLeft = "130px"
   news5.innerHTML = ''
    news5.appendChild(imageNode4)
    news5.appendChild(headline4) 
    news5.appendChild(date4)
    news5.appendChild(linkNode4)
   }
    else
    {
      news5.innerHTML = ''
  document.querySelector('.News5').style.visibility = "hidden";
    }
  }
 
  async function fetchChartsData(url,search_value)
  {
    var response = ''
    var response_json = ''
    response = await fetch(url);
    response_json =  await response.json();
    var check1 = Object.keys(response_json).length === 0 && response_json.constructor === Object
    if(!response.ok)
    {
      return
    }
    const date = [];
    const stock_price = [];
    const volume = [];
    response_json.forEach(document => {
      if(document.hasOwnProperty('timestamp')){
        date.push(document.timestamp)
      }
    });
    response_json.forEach(document => {
      if(document.hasOwnProperty('close')){
        stock_price.push(document.close)
      }
    });
    response_json.forEach(document => {
      if(document.hasOwnProperty('volume')){
        volume.push(document.volume)
      }
    });
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()+1
    const day = currentDate.getDate()
    var a =''
    if (month < 10)
      a = '0'
    var b = ''
    if (day < 10)
      b = '0'
    const formatteddate = ' ('+year+'-'+a+month+'-'+b+day+')'
    Highcharts.stockChart('chartcontainer',{
      title:{
        text:'Stock Price '+search_value+formatteddate
      },
      subtitle:{
        text:'<a href ="https://polygon.io/" target = "_blank">Source: Polygon.io</a>',
        useHTML:true
      },
      xAxis:{
          type: 'datetime',
          crosshair: true,
          labels: {
            formatter: function () {
                return Highcharts.dateFormat('%e %b', this.value);
            }
        },
        tooltip:{
          pointFormatter: function(){
            return '<span style="color:' + this.color +'">\u25CF</span' + Highcharts.dateFormat('%A,%e %b, %H:%M', this.x) + '<br>';
          }
        }
      },
      yAxis:[
        {
          title:{
            text:'Stock Price',
          },
          opposite:false
        },
        {
          title:{
            text:'Volume',
          },
          opposite:true
        },
      ],
      series:[
        {
          name:'Stock Price',
          type:'area',
          data:date.map((timestamp, index) => [timestamp, stock_price[index]]),
          yAxis:0,
          fillOpacity:0.3,
        },
        {
          name:'Volume',
          type:'column',
          data:date.map((timestamp, index) => [timestamp, volume[index]]),
          yAxis:1,
          color:'black'
        }
      ],
      rangeSelector:{
        buttons:[
          {
            type: 'day',
            count:7,
            text: '7d'
          },
          {
            type: 'day',
            count:15,
            text: '15d'
          },
          {
            type: 'month',
            count:1,
            text: '1m'
          },
          {
            type: 'month',
            count:3,
            text: '3m'
          },
          {
          type: 'month',
          count:6,
          text: '6m'
        },
      ],
      selected: 0,
      allButtonsEnabled:true,
      inputEnabled:false
      }
    })
  }
async function fetchDataCompany(url){
  var response = ''
    var response_json = ''
    try{
    response = await fetch(url);
    response_json =  await response.json();
    var check1 = Object.keys(response_json).length === 0 && response_json.constructor === Object
   
    if(check1)
    {
      return
    }
  const cell2 = document.getElementById('tablecell2') 
  const cell4 = document.getElementById('tablecell4') 
  const cell6 = document.getElementById('tablecell6') 
  const cell8 = document.getElementById('tablecell8') 
  const cell10 = document.getElementById('tablecell10') 
  cell2.textContent =  response_json['name']
  cell4.textContent =  response_json['ticker']
  cell6.textContent =  response_json['exchange']
  cell8.textContent =  response_json['ipo']
  cell10.textContent =  response_json['finnhubIndustry']
  const compImage = document.getElementById('CompImage')
  compImage.src = response_json['logo']
  var tab = document.querySelector('.tab')
  compImage.style.height = '100px'
  const Table = document.querySelector('.Table')
  const company_button = document.querySelector('.company-button')
  var check1 = Object.keys(response_json).length === 0 && response_json.constructor === Object
  if (!check1)
  {
    simulateClick(company_button)
  }
    }
    catch(error)
    {
      return;
    }
}  
async function fetchDatastock(url,search_value){
  var response = ''
    var response_json = ''
    response = await fetch(url);
    response_json =  await response.json();
    var check1 = Object.keys(response_json).length === 0 && response_json.constructor === Object
   
    if(!response.ok)
    {
      return
    }
  const cell12 = document.getElementById('tablecell12') 
  const cell14 = document.getElementById('tablecell14') 
  const cell16 = document.getElementById('tablecell16') 
  const cell18 = document.getElementById('tablecell18') 
  const cell20 = document.getElementById('tablecell20') 
  const cell22 = document.getElementById('tablecell22') 
  const cell24 = document.getElementById('tablecell24') 
  const cell26 = document.getElementById('tablecell26') 
  cell12.textContent =  search_value
  cell14.textContent =  response_json['t']
  cell16.textContent =  response_json['pc']
  cell18.textContent =  response_json['o']
  cell20.textContent =  response_json['h']
  cell22.textContent =  response_json['l']
  /* cell24.textContent =  response_json['d']
  cell26.textContent =  response_json['dp'] */
  const imgElement1 = document.createElement('img')
  if (response_json['d'] > 0){
    imgElement1.src = 'static/Images/img/GreenArrowUp.png'
  }
  else{
    imgElement1.src = 'static/Images/img/RedArrowDown.png'
  }
  imgElement1.style.height = '10px'
  const textNode1 = document.createTextNode(response_json['d'])
  const containerdiv1 = document.createElement('div')
  
  containerdiv1.appendChild(textNode1)
  containerdiv1.appendChild(imgElement1)
  containerdiv1.style.x
  containerdiv1.style.alignItems = 'center'
  cell24.innerHTML = ""
  cell24.appendChild(containerdiv1)
  const imgElement2 = document.createElement('img')
  if (response_json['dp'] > 0){
    imgElement2.src = 'static/Images/img/GreenArrowUp.png'
  }
  else{
    imgElement2.src = 'static/Images/img/RedArrowDown.png'
  }
  imgElement2.style.height = '10px'
  const textNode2 = document.createTextNode(response_json['dp'])
  const containerdiv2 = document.createElement('div')  
  containerdiv2.appendChild(textNode2)
  containerdiv2.appendChild(imgElement2)
  cell26.innerHTML = ""
  cell26.appendChild(containerdiv2)
  const cell27 = document.getElementById('tablecell27') 
  const cell28 = document.getElementById('tablecell28') 
  const cell29 = document.getElementById('tablecell29') 
  const cell30 = document.getElementById('tablecell30') 
  const cell31 = document.getElementById('tablecell31') 
  cell27.textContent =  response_json['strongSell']
  cell28.textContent =  response_json['sell']
  cell29.textContent =  response_json['hold']
  cell30.textContent =  response_json['buy']
  cell31.textContent =  response_json['strongBuy']


}  

async function SearchInput(){
  if(document.querySelector('.search-bar').value.length === 0)
  {
    document.querySelector('.search-bar').reportValidity()
    return;
  }
  var search_value = document.querySelector('.search-bar').value;
  search_value = search_value.toUpperCase();
  /* const url1 = "http://127.0.0.1:8080/company?stock_ticker="+search_value
  const url2 = "http://127.0.0.1:8080/stock?stock_ticker="+search_value
  const url3 = "http://127.0.0.1:8080/chart?stock_ticker="+search_value
  const url4 = "http://127.0.0.1:8080/news?stock_ticker="+search_value */
  const url1 = "https://myfirstpythontest-415221.wl.r.appspot.com/company?stock_ticker="+search_value
  const url2 = "https://myfirstpythontest-415221.wl.r.appspot.com/stock?stock_ticker="+search_value
  const url3 = "https://myfirstpythontest-415221.wl.r.appspot.com/chart?stock_ticker="+search_value
  const url4 = "https://myfirstpythontest-415221.wl.r.appspot.com/news?stock_ticker="+search_value
 
  try{
     const [Result1 ,Result2,Result3, Result4] = await Promise.all([
      fetchDataCompany(url1),
      fetchDatastock(url2,search_value),
      fetchChartsData(url3,search_value),
      fetchNewsData(url4)
    ]); 
  }catch(error){
    clearSearch1()
    setTimeout(() =>{
      document.querySelector('.tab').style.visibility ="hidden";
      document.getElementById('CompImage').style.visibility = "hidden";
      document.querySelector('.Table').style.visibility = "hidden";
      document.querySelector('.StockTable').style.visibility = "hidden";
      document.getElementById('chartcontainer').style.visibility = "hidden";
      document.querySelector('.News').style.visibility = "hidden";
      document.querySelector('.News1').style.visibility = "hidden";
      document.querySelector('.News2').style.visibility = "hidden";
      document.querySelector('.News3').style.visibility = "hidden";
      document.querySelector('.News4').style.visibility = "hidden";
      document.querySelector('.News5').style.visibility = "hidden";
      document.querySelector('.Error-container').style.visibility = "visible";
    },0);
  }
}
