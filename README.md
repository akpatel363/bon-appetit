# Bon Appetit

It's an online food ordering system made using MongoDB, Express, Angular and Bootstrap.

To run this app on your machine

1. Install node modules for backend (express) as well as frontend (Angular).
2. Rename [nodemon.sample.json](nodemon.sample.json) to nodemon.json.
3. Enter port, mongo uri and secret in nodemon.json.
   ```json
   {
     "env": {
       "PORT": "PORT",
       "MONGO_URI": "MONGO_URI",
       "SECRET": "SECRET"
     }
   }
   ```
4. To start the express server execute the following command.
   ```shell
   npm run dev
   ```
5. To serve angular execute the following command in client directory.
   ```shell
   ng serve -o
   ```
