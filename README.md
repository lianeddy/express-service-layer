# express-service-layer

A simple express REST API using a service layered architecture

## Concepts

This API is designed to extract and separate our business logic from the API. Here is a summary on how our application will behave:

1. Controllers will only receive requests and submit responses. All business logic will be sent to services.
2. A service will contain all business logic but should not receive the `req` and `res` objects from controllers. It will also make calls to a data access service for database queries.
3. A data access object service will be responsible to make database queries.

This will separate the concerns of each layer and will provide easier test writing. Since our business logic is separated in a different layer, we don't need to create mocks for the `req` and `res` objects in our service layer.

Using the concept of abstraction, we also separate our database access to a different layer. This means our service layer will also need no implementation details on how our data access service queries our database. This will also provide better scalability, because if in the future we need to switch ORMs, we will only need to modify our data access service.

## Functionality

- HTTP(S) Request Logging
- Configurable application variables
- REST-ful API Setup
- SQL Support using Sequelize
