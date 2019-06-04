<p align="center">
  <img src="./guinea-pig.jpg" alt="Technically it's suppossed to be a hamster sitting in a little airplane. From The Simpsons episode 'Duffless'" />
</p>

# Guinea Pig

A sample application for testing various cloud platforms

[![Build Status](https://travis-ci.com/thebinarypenguin/guinea-pig-server.svg?token=wgXbRDphARahAzHYfTQU&branch=master)](https://travis-ci.com/thebinarypenguin/guinea-pig-server)
[![codecov](https://codecov.io/gh/thebinarypenguin/guinea-pig-server/branch/master/graph/badge.svg?token=QBQ9cxGDUr)](https://codecov.io/gh/thebinarypenguin/guinea-pig-server) [![Greenkeeper badge](https://badges.greenkeeper.io/thebinarypenguin/guinea-pig-server.svg?token=1eb2382e4bd1b44bcf755b89a5c1c8c20db0ff55c2481e16d1c22920258b8707&ts=1559673742901)](https://greenkeeper.io/)

## Installation

 1. Install dependencies.

    ```sh
    npm install
    ```

 2. Create an environment file.

    ```sh
    cp example.env .env
    ```
    Replace the sample content with your database credentials and other
    configuration options. You will need one database for the application and a
    second database for the tests.

 3. Migrate the application database.

    ```sh
    npx knex migrate:latest
    ```

 4. Seed the application database.

    ```sh
    npx knex seed:run
    ```

 5. Start the application.

    ```sh
    npm start
    ```
