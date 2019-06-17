<p align="center">
  <img
   src="./guinea-pig.jpg"
   alt="Technically it's supposed to be a hamster sitting in a little airplane.
   From The Simpsons episode 'Duffless'"
  />
</p>

# Guinea Pig (server)

A sample application for testing various cloud platforms

[![Build Status](https://travis-ci.com/thebinarypenguin/guinea-pig-server.svg?token=wgXbRDphARahAzHYfTQU&branch=master)](https://travis-ci.com/thebinarypenguin/guinea-pig-server)
[![codecov](https://codecov.io/gh/thebinarypenguin/guinea-pig-server/branch/master/graph/badge.svg?token=QBQ9cxGDUr)](https://codecov.io/gh/thebinarypenguin/guinea-pig-server)

## Installation

 1. Create an environment file.

    ```sh
    cp example.env .env
    ```
    Replace the sample content with your database credentials and other
    configuration options. You will need one database for the application and a
    second database for the tests.

 2. Install dependencies.

    ```sh
    npm install
    ```

 3. Migrate the application database.

    ```sh
    npm run migrate-up
    ```

 4. Seed the application database.

    ```sh
    npm run seed
    ```

 5. Start the application.

    ```sh
    npm start
    ```
