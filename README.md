# Webpacker Devise Token Auth GraphQL Boilerplate

![](https://i.imgur.com/fpudPZs.png)

## Table of Contents

* [Setup](#setup)
* [Testing](#testing)
* [Local Development](#local-development)

## Setup

1. Set up Heroku
1. Set up Travis in repo
1. Set variables in heroku
1. Update names in:
    * `config/database.example.yml`
    * `config/application.rb`
    * `app/views/layouts/application.html.erb`
    * `app/services/graphql/execute.rb`
    * `app/javascript/packs/src/components/authentication/RecoverPassword/index.jsx`
    * `app/graphql/webpacker_devise_token_auth_graphql_boilerplate.rb`
1. `cp config/database.example.yml config/database.yml`
1. `bundle install`
1. `yarn install`
1. Run `bundle exec rspec`
1. Run `bundle exec rubocop`
1. Run `yarn test`
1. Run `yarn lint`
1. `rails db:setup`

## Testing

1. `rspec`

## Linting

1. `npm run lint-fix`
1. `rubocop -a`

## Local Development

1. In one terminal, run `./bin/webpack-dev-server`
1. In another, run `rails s`
1. Visit [http://localhost:3000/#/](http://localhost:3000/#/)
