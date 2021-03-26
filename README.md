# Learn By Vueing

**A project to help me learn Vue and other backend techs.**

Todos:

- Refactor backend to use MongoDB MVC as per the M220JS class
- Refactor backend to use MongoDB and Spring Boot as per M220J class
- Refactor backend to use sequelize and a PostgreSQL database
- Actually write tests

## Setup

1. `cd client`
2. `npm install`
3. `cd ../server`
4. `npm install`

## Running on local machine

1. `cd client`
2. `npm run serve`
3. `cd ../server`
4. `npm start`

### You can simulate the production build. The static files from dist are served.

1. `cd client`
2. `npm run build`
3. `cd ../server`
4. `NODE_ENV=production node server.js`

If the app is stuck at a loading screen and fails to sign in, it's possible that the Auth0 authorization request failed with a 403. Make sure that no other apps are running on ports 3000 or 3001, then restart the server / client.
