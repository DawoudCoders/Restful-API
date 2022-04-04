Backend project nc-news

This repo is a RESTful API, using an MVC framework, built for purpose of accessing application data programmatically.

To use:
1)Fork the repo
2)Clone it down for local use
3)To connect to the databases you must add a ".env.development" and a ".env.test" file each containing "PGDATABASE=nc_news" and "PGDATABASE=nc_news_test" respectively. This must be done in the root folder of the directory.

(if you get an error along the lines of "connect ECONNREFUSED 127.0.0.1:5432" - You may need to run the following command first to start the PostrgreSQL server in order for the psql command to work: sudo service postgresql start)

4)For local use, run script "npm start" in terminal. This will allow a local version of the app to listen for use with 3rd party tools such as insomnia. 

A link to the hosted version of the API: 
https://first-heroku-hosting-project.herokuapp.com/
