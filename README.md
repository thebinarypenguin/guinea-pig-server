<p style="text-align:center">
  <img src="./guinea-pig.jpg" alt="Technically it's suppossed to be a hamster sitting in a little airplane. From The Simpsons episode 'Duffless'" />
</p>

# Guinea Pig

Sample application for testing various cloud platforms

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
