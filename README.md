# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## Configuration

By default the back-end assumes that it will be receiving connections from
localhost:5173. To add other URIs to the CORS set the FRONTEND_URI environmental
variable.

No CORS configuration has been set-up for other environments.

```sh
# Example for running on a different port
export FRONTEND_URI="localhost:6002,127.0.0.1:6002"
``

## Scope limitations

This section lists some of the decisions made to limit scope for the sake of time.

### Email/Phone validation

In a real application email and phone can only be properly validated by either making an
email, or a call/text. An email_validated_at/phone_validated_at timestamp can be added
to track this. As both details can go invalid over time, a timestamp of last known
validity can be useful for auditing data quality.

### Date of birth

This is flagged a a required field, that cannot be in the future. In practice their may
be occasions where a surgery may wish to register a baby prior to birth. I've considered
this out of scope.

### Gender / Title lookup

We'll be hiding implementation details from the API. This means each attempt to set
gender or title will hit the database. If we were to support bulk inserts, or expecting
to scale significantly, then some performance optimizations would be required.

### Patient deletion

Currently we just use the standard Rails destroy function. In practice patient removal
would probably be tied in to a complete 'off-boarding' process, ensuring transfer of
medical records, and removal of any associated data as required by GDPR and other
data-retention practices.

### API choices

I've avoided adopting a JSON standard such as [json:api](https://jsonapi.org/) in order
to keep things simple. Json:api does provide some really nice features, like sparse
fieldsets and eager loading, which provide a GraphQL like way of loading related
data-sets.
