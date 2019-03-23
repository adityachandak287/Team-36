# Team-36

Our solution is live [here](http://139.59.90.174:3000/)

## Topic - Agriculture

**Krishi Sahayak** - A farmer's assistant.
We have made an assistant for every farmer where he gets local weather data in regional languages as well as gets subjective advice based on the soil conditions and market demands.

## Our Solution
### Part a
* Getting weather data in the regional language based on the user's location and displaying a summary of the past weather conditions.
  
  >[**_./views/weather.html_**](https://github.com/vinnovateit/Team-36/blob/master/views/weather.html)
* Getting soil conditions using an **Arduino** which sends the data to our server where we apply **Machine Learning** Algorithms to predict the most suitable crops that can be grown in that soil in the current conditions.
  
   >[**_./suggestionBackend/_**](https://github.com/vinnovateit/Team-36/tree/master/suggestionBackend)
### Part b
* Implementing a real-time bidding platform using **socket.io** where farmers can put up their crops and interested buyers can bid for the same. Once the farmer is satisfied with the price, he can select the highest bidder and they are then redirected to a private chat application where they can iron out the logistics.
  
  >[**_/bidding/_**](https://github.com/vinnovateit/Team-36/tree/master/bidding)
  >[Real Time Bidding and Chat Portal](http://139.59.90.174:3001/)
## Team Members
* Yash Mehrotra 17BIT0277 [Github Profile](https://github.com/yashmeh)
* Aditya Chandak 17BIT0003 [Github Profile](https://github.com/adityachandak287)
* Archit Agarwal 17BCE2089 [Github Profile](https://github.com/geekyhitman274)
* Allandhir Megharaj 17BIS0092 [Github Profile](https://github.com/allandhir)
 



