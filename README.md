# InstaGroom.me
Mobile Groomer's need a simple easy to use app to keep track of customers, their animals, and the appointments for grooming. 
​
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=plastic)
        <img src="https://img.shields.io/badge/license-MIT-green?style=plastic" alt="License Badge">  [![GitHub pull-requests closed](https://img.shields.io/github/issues-pr-closed/deawar/InstaGroom.me.svg?style=plastic)](https://GitHub.com/deawar/InstaGroom.me/pull/) [![GitHub stars](https://img.shields.io/github/stars/deawar/InstaGroom.me.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/deawar/InstaGroom.me/stargazers/)
​
# Project-Title: 
InstaGroom.Me
​
## Author: 
Andrew Murray, Ankit Mudvari, Dean Warren, Jonathan Kelly
​
## Table of Contents
--------------------
* [Installation](#installation)
* [License](#license)
* [Usage](#usage)
* [Collaborators](#collaborators)
* [Test](#test)
* [Contributing](#contributing)
* [Demo](#demo)
* [Questions](#questions)
​
## Installation
To install necessary dependencies, run the following command:<br>
```
npm install
```
Create a `.env` file for all system variables:
```
# .env for InstaGroom.Me
# Node Environment
NODE_ENV=development
PORT=3000
​
# MongoDB Credentials  Note-We found it VERY Helpful to setup a centralized Databaset to work from. That way we never had to reseed and we always knew if database calls worked.*
DB_USER=root
DB_PASSWORD=root
DB_NAME=groomDb
DB_HOST=localhost
​
# SESSION SECRET
JWTKEY='your secret password'
​
# GMAIL Account credentials
GMAIL_SERVICE_HOST=smtp.gmail.com
GMAIL_PASSWORD='your gmail password here'
GMAIL_USERNAME='gmail-account@gmail.com'
GMAIL_SERVICE_SECURE=false
GMAIL_SERVICE_PORT=587
GOOGLE_DIRECTION_URI='https://maps.googleapis.com/maps/api/directions/json?'
GOOGLE_MAPS_URL='https://maps.googleapis.com/maps/api/geocode/json'
GOOGLE_MAPS_API_KEY="Your API KEY HERE"
GOOGLE_API_KEY="Your API KEY HERE"
REVERSE_GEOCODE_URI='https://maps.googleapis.com/maps/api/geocode/json?'
​
# Twilio Account Credentials to be completed in v2.0
TWILIO_ACC_SID='your Twilio SID here'
TWILIO_AUTH_TOKEN=your Twilio Auth_Token here'
TWILIO_PHONE_NUM='Twilio Phone Number'
```
​
## License
MIT
​
## Usage
I am a mobile groomer who needs to have a reliable way to keep up with appointments and send notifications to clients as well as have maps and notes on each dog I work on. I want to be able to display my appointments on one daily screen and automatically let my next client know when i am en route. I need an easy way to charge my clients and tally the days receipts. 
​
## Collaborators
[deawar](https://github.com/deawar)<br>[itsjonkelley](https://github.com/itsjonkelley)<br>[ankmud01](https://github.com/ankmud01)<br>[atmurray-fullstack](https://github.com/atmurray-fullstack)
​
​
## Test
To run test, run the following comand:<br>
```
npm run lint
```
To run the application locally, run the following command:<br>
```
npm run start_local
```
Or :<br>
```
node -r dotenv/config server.js 
```
Or if you prefer `nodemon` :<br>
```
 nodemon -r dotenv/config server.js
```
​
## Contributing
This application will be used for helping small businesses find a better way to conduct their daily business activites. So, please be respectful and mindful to others
​
<br>

## Demo
<img src="https://github.com/deawar/InstaGroom.me/blob/master/public/img/Instagroom.Me.gif?raw=true" alt="Demo">
​<br>

## Questions

​<br>
<img src="https://avatars1.githubusercontent.com/u/15312495?s=400&u=ca57805f0913479f15a13ed8e5a1577eb95c0926&v=4" alt="ME" width="120" height="120"><br>
If you have any questions about the repo contact deawar directly at deawar@gmail.com, ankmud01@gmail.com, Atmurray-FullStack or itsjonkelley. Thank you for your interest.<br>
If you want to see more of my work please click here https://github.com/deawar.
​
## Deployed BackEnd
[InstaGroom.Me](https://www.instagroome.me) Hosted on Heroku with directions to download the InstaGroom-Client from the GooglePlay website.