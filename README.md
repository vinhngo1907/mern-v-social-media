# V-Social-Media

## Features - What I have completed
* [x] HTTP basic
* [x] login to create and enjoy your posts
* [x] oauth2 with facebook, google and sms 
* [x] search users by user name and full name
* [x] comments, likes and share post
* [x] likes and reply comment
* [x] realtime chat, phone call, video call, comment, likes, follow
* [x] notifications for likes, comment, follow...
* [x] people nearby, posts explore
* [x] group chat,
* [x] other: 24 hour stories, audio files, events, Advertisement (boost post), emoji comments,...

## Installation
### Prerequisites
- Docker & Docker Compose
- Node.js (v16 or newer), npm and yarn

### To run the app with Node.js and MongoDB
Install and start [MongoDB](https://docs.mongodb.org/manual/installation).

Install [Node.js](http://nodejs.org). Any version above 6.0 works fine

Open `.env` and adjust the `MONGODB_URI` to your MongoDB server name (localhost normally works if you're running locally).

1. Run `npm install`.

2. CD client && Run `npm run start` to start the frontend client
  * [x] Wait for the build process to complete

  * [x] Navigate to http://localhost:5002 in your browser to explore the app

3. CD Server && Run `npm run server` to start the api server

☞ Go to http://localhost:5001 in your browser to explore the server

## Build the app
**1. Build server (API)**
```
  cd packages/server
  npm install
  npm run server
```

**2. Build Client (B2C - )**
```
  cd packages/client
  npm install
  npm run build
```
The build folder is created at: packages/client/build

**3. Build CMS (B2B)**
```
  cd packages/client
  npm install
  npm run build
```
The build folder is created at: packages/cms/build

## Deployment Guideline
### Prerequisites
- Render
- Netlify
- Permission to access resources in [mern-v-social-media](https://github.com/vinhngo1907/mern-v-social-media) project
- Credentials of __*****__ Statging MongoDB - __The staging environment uses MongoDB Atlas (MongoDB Cloud) to simplify database management and scaling via a hosted cluster__.

### Deployment Steps
**1. Deploy Server in [Render](https://render.com/)**
1. Create an account and connect GitHub repo.

2. Create Web Service on Render.

3. Configuration:
  - Build Command: ```npm install```
  - Start Command: ```npm start``` or ```npm run server```
  - Environment Variables: enter environment variables (MONGODB_URI, PORT, etc.). You can refernce in file ```packages/server/.env.default```

4. Render will automatically build and deploy when there is an update from GitHub.

**2. Deploy Client & CMS lên [Netlify](https://netlify.com/)**
  1. Go to Netlify and select "Import from GitHub".
  2. Select the repo, configure:
    - Build command: ```npm run build```
    - Publish directory:
      * ```client/build``` (for user app)
      * ```cms/build``` (for CMS admin)
  3. Netlify will automatically build and deploy.

## Contributors
- [❤️] [Koo Kuu](https://github.com/vinhngo1907)
- [🚀] [Henry Ngo](https://github.com/vinhngo001)


# What can be improved
1. More unit tests for back-end(server).
2. Write some end-to-end tests.
3. Real-time sync for Chart Service using socket.io combine with message queue(RabbitMQ or Kafka).
4. The front-end(client - cms) can be built & deployed to Google Storage for faster performance.
5. We can create 1 more branch called releases. The CI should support deploying the app when code is merged to this branch.