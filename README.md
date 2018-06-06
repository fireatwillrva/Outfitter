# Outfitter
An outfit-picking application with Node.js/Sequelize/Express/MySQL/Animate.css

## Description

*Outfitter* is a full stack outfit-picking application. The user may upload their articles of clothing and accessories to the database. Doing so will place the clothes in their virtual closet (and MySQL database), where they can pair articles together and save outfits.

The application is implemented using a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) server on the back end, a [MySQL](https://www.mysql.com/) database and [Bootstrap](https://getbootstrap.com/) with [Animate.css](https://daneden.github.io/animate.css/) on the front end.

## Demo

The demo of *Outfitter* can be found [here](https://outfitter-rva.herokuapp.com/) on Heroku. It has not been optimized for desktop, so view it on a mobile device.

### Installation

To install the application follow the instructions below:

``` Javascript
	git clone git@github.com:lukemyers0921/Outfitter.git
	cd Outfitter
	npm install
	npm install -g sequelize sequelize-cli
	sequelize init:models & sequelize init:config
```

### MySQL Database Setup

In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the version you need for your operating system. Once you have MySQL isntalled, import the database with the SQL code found in [schema.sql](./db/schema.sql) in the *db* folder. You can populate the table by then importing [seeds.sql](./db/seeds.sql) or by adding them in the application.
	
### Running Locally

To run the application locally and access it in your browser, open [server.js](./server.js) in the terminal and run the command below.

``` Javascript
	node server.js
```
	
The application will now be running locally in your browser at the URL `http://localhost:8080`.

### Authors

* *Front-End*: Louis Boehling & Will Fisher
* *Back-End*: Lacy Forrest & Luke Myers