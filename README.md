authkeeper
======
An isomorphic javascript ( React + Redux + Node + Express + MongoDB ) starter app which utilizes JWTs (JSON Web Tokens) and React HOCs (Higher-Order Components) for authentication and role-based authorization.


###Application Design and Dependencies:###

Client-Side

* react - javascript library for creating views/interfaces with components

* redux - responsible for managing the client application's state

* react-router - maps react components to URL routes, thus enabling single-page navigation

* redux-thunk - redux middleware that allows allows us to dispatch actions asynchronously by allowing action creators to return functions

* axios - for making AJAX requests to the server

* jwt-decode - for decoding the data carried in the JWTs given to the authenticated client by the server

* redux-form - an HOC which enables us to store our form state in the redux store

* webpack - builds the client-side portion of our app out of various assets, dependencies, and modules



Server-Side

* express - a node.js http server framework and interface

* mongoose - mongoDB object modeling tool

* jwt-simple - we use this module's encode method to create our JSON Web Tokens (JWTs)

* passportJS
    * passport - express authentication middleware
    * passport-jwt - passport strategy/plugin for authenticating with JSON Web Tokens
    * passport-local - passport strategy/plugin for authenticating with a username and password.

* bcrypt-nodejs - for encrypting user passwords before saving them to the database

* cors - gives clients cross-origin access to the server
