from flask import Flask, request
app = Flask(__name__)
import finnhub
from polygon import RESTClient
from datetime import * 
from dateutil.relativedelta import *
import calendar
finhub_key = "cn2631hr01qmg1p4kj9gcn2631hr01qmg1p4kja0"
polygon_key = "ai6qW14fjwXcRK_WOqJl4XdA57pCUHTK"
@app.route('/')
def homepage():
    return app.send_static_file("index.html")
@app.route('/company', methods=['GET'])
def getcompanyinfo():
    stock_ticker = request.args.get('stock_ticker')
    finnhub_client = finnhub.Client(api_key= finhub_key)
    company_data = finnhub_client.company_profile2(symbol=stock_ticker)
  
    return company_data
@app.route('/stock', methods=['GET'])
def getcompanystockinfo():
    stock_ticker = request.args.get('stock_ticker')
    finnhub_client = finnhub.Client(api_key= finhub_key)
    stock_data = finnhub_client.quote(symbol=stock_ticker)
    recommendation_info = finnhub_client.recommendation_trends(symbol=stock_ticker)
    latest_recom = recommendation_info[0]
    stock_data.update(latest_recom)
   
    return stock_data
@app.route('/chart', methods=['GET'])
def getcompanychartinfo():
    stock_ticker = request.args.get('stock_ticker')
    client = RESTClient(api_key=polygon_key)
    aggs = []
    today = date.today()
    from_date = today+relativedelta(months=-6,days=-1)
    for a in client.list_aggs(ticker=stock_ticker, multiplier=1, timespan="day", from_= from_date, to= today):
        aggs.append(a)
    return aggs
@app.route('/news', methods=['GET'])
def getcompanynewsinfo():
    stock_ticker = request.args.get('stock_ticker')
    finnhub_client = finnhub.Client(api_key= finhub_key)
    today = date.today()
    from_date = today+relativedelta(days=-30)
    news = finnhub_client.company_news(stock_ticker, _from=from_date, to=today)
    
    return news
if __name__ == "__main__":
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)


