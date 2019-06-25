# Serving a Node.js/PostgreSQL app on Heroku

## Official Docs

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql)

## TL;DR

Using the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) from
the project root directory

 1. Log into Heroku

    ```heroku login```

 2. Create a new application

    ```heroku create [name]```

 3. Add a PostgreSQL database

    ```heroku addons:create heroku-postgresql:hobby-dev```

 4. Set any environment variables (optional)

    ```heroku config:set NAME=value```

 5. Push code

    ```git push heroku master``` OR ```git push heroku <branch>:master```

 6. Run any one-off scripts (optional)

    ```heroku run npm run foobar```
