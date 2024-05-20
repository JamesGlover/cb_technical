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
