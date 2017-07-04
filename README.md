
# Technical test

## Technological choices

I chose to use Node.js as the backend technology. I decided to use different
kind of libraries as Babel, Express, React, Redux and Webpack.

For dev, I used Nodemon and Webpack watching mechanism. For the tests, I made unit and functional with the Ava.js and supertest.

The idea is to show I'm used to use all of these libraries, and assemble them.
I did not use any global framework, neither some yeoman generator and pre-built project.

Of course it could be better. I could go deeper and use for example redux-storage, hot-reloading and Webpack for the backend (target 'node'), instead of using inline babel hook.

I made it simple, because I miss some time. I started yesterday, go to beach in the end of the afternoon (because it's Malta...), and finished the test this morning.

## How to

Install

    yarn install

Run tests (unit & functional):

    yarn test

Run the application:

    yarn start

Run in dev mode:

    # in one shell
    yarn watch-client

    # in another shell
    yarn watch-server
