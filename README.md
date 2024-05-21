# README

## Prequisites

- Ruby 3.3.1
- Postgres server and development libraries such as libpq-dev
- Node 20.13.1

## Installation

```sh
# Clone the repo
git clone git@github.com:JamesGlover/cb_technical.git
cd cb_technical
# Run the setup: this will install ruby and node dependencies and set up the database
bin/setup
```

You can generate additional dummy patient data:
```sh
bundle exec rake db:create_patients
```

## Tests

I've included unit tests and request tests for the Ruby. As I've been unfamiliar with
React, I've been following a more prototyping approach to development, and in interests
of time, I've not written unit tests, or integration tests.

```sh
bundle exec rspec
```

Ideally I'd have liked to have a vitest based unit test suite for the typescript
elements. Also, I find end to end tests can be helpful for key workflows. Here I'm
familiar with both capybara, and cypress. The former works better if we're needing to
set up a lot of back-end state. The latter makes it a little easier to investigate
test-failures.

## Configuration

By default the back-end assumes that it will be receiving connections from
localhost:5173. To add other URIs to the CORS set the FRONTEND_URI environmental
variable.

No CORS configuration has been set-up for other environments.

```sh
# Example for running on a different port
export FRONTEND_URI="localhost:6002,127.0.0.1:6002"
```

## Scope limitations

This section lists some of the decisions made to limit scope for the sake of time.

### Missing requirements

Still missing is the functionality to create new users, and to search.

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

### Pagination

I'm currently not paginating results. This would cause performance issues as the number
of users increases. A simple solution here would be an offset based solution, especially
as we're probably unlikely to see someone clicking through pages of patients, and
patient registration will be a relatively uncommon event. A more robust solution would
be to generate a client side 'cursor' based on the last element in the original result.
This would handle the addition and removal of patients, scale better to larger result
sets, with the cost of removing the ability to jump to arbitary 'pages'.

### Testing

As discussed above, testing is somewhat more limited than I'd like.

### Error feedback

I'm still hoping to improve the error feedback from the update and create actions.
