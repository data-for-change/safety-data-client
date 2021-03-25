![cahrts-1](https://user-images.githubusercontent.com/342644/112526699-e8863b80-8daa-11eb-8cd3-1bb81b23db1e.PNG)
Safety-Data presents data on road accidents in Israel. The site analysis focus on casualties in severe and fatal accidents, in accordance to [Vision Zero](https://en.wikipedia.org/wiki/Vision_Zero).

The site offers a variety of options to filter, group and display the data in different formats, in the hope that this will improve research, policy and education on accidents prevention. It is a tool for city planners, safety experts, researchers and more.  

With Safety-Data you can check:
* What is the gender difference in different kind of vehicle?
* In what places are car drivers injured? what are the common accidents in the urban area and how it is diffrent from rural accidents.
* What types of fatal accidents are most common for motorcyclists in cities? or many young motorcyclists were killed, compared to older motorcyclists?
* How many pedestrians were hit Jerusalem? what are the most denageros streets for pedestrians there?  
* what are the "red roads"?
* Compare the number of fatalities in 2 or more cities. 
* Find the top 10 cities where most severe accidents happened.
* What percent of pedestrians where hit at daytime compare to nighttime?

Tipical use case is filter cases by categories of when, where, who, road - types etc. for exmaple see all fatal accidnets in tel-aviv.
then you can serach patterns in the data using one or 2 grouping options - for example group the results by age. you can find more patterns by looking on the reuslts in a map or in a table. you can also copy the resutls to tables for more analis. 


The source of the data on the accidents is CBS, through accidents data engine of [Anyway project](https://www.anyway.co.il/), from the Public Knowledge Workshop. The map on the site is thanks to the [OpenStreetMap](https://www.openstreetmap.org/) project

Technologies of the site are React.js front-end and Node.js + MongoDB back-end.

Server side:
Typescript Express, async/await, REST-API 
using mongoose, helmet, winston, morgan, multer


