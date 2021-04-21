# README

## Installation

Ruby version: 2.5.3

-   Create database named `sugaro_backend_development` and `sugaro_backend_test`
-   Run the following commands

```
bundle
bin/rails db:migrate
bin/rails db:migrate RAILS_ENV=test
```

-   Change Facebook app api and secret in `config/local_env.yml`

```
FB_APP_ID: "4165154470218070"
FB_APP_SECRET: "e0d49cde624cdf75c9df9b60e7556db7"
```

-   Change database config in `config/database.yml`
-   Start server

```
bin/rails server
```

## Run rspec test

```
bundle exec rspec spec
```
