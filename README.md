# Learn By Vueing

**A project to help me learn Vue and other backend techs.**

Todos:

- Use JWT to provide a more authenticated experience for users
- Create a sessions collection in MongoDB. Create a doc when user logs in, delete it when they log out
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
5. Navigate to http://localhost:3000/

### You can simulate the production build. The static build files from client/dist are served.

1. `cd client`
2. `npm run build`
3. `cd ../server`
4. `NODE_ENV=production node server.js`
5. Navigate to http://localhost:3001/

### FOR ME ONLY

Obtain .env files from me before attempting to run this, or connect it to your own Auth0 and MongoDBs.

- heroku git:remote -a learn-by-vueing
- git push heroku HEAD:master
- heroku logs --tail

If the app is stuck at a loading screen and fails to sign in, it's possible that the Auth0 authorization request failed with a 403. Make sure that no other apps are running on ports 3000 or 3001, then restart the server / client.
