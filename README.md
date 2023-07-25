# V-Social-Media

## Features
* HTTP basic
* login to create and enjoy your posts
* oauth2 with facebook, google and sms 
* search users by user name and full name
* Comments, likes and share post
* realtime chat, phone call, video call

## Installation
### To run the app with Node.js and MongoDB

Install and start MongoDB (https://docs.mongodb.org/manual/installation).

Install Node.js (http://nodejs.org). Any version above 6.0 works fine

Open .env and adjust the `MONGODB_URI` to your MongoDB server name (localhost normally works if you're running locally).

1. Run `npm install`.

2. CD client && Run `npm run start` to start the frontend server

Wait for the build process to complete

3. CD Server && Run `npm run server` to start the api server

Navigate to http://localhost:5002 in your browser to explore the app

## Build the app
* Build manually
```
 $ npm start
```

After building the app, frontend and backend servers will be merged into a single server and be available at http://localhost:5002

## Contributors
- [Koo Kuu](https://github.com/vinhngo1907)
- [Henry Ngo](https://github.com/vinhngo001)
