source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 5.2.2'

gem 'active_interaction'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'devise_token_auth'
gem 'graphql'
gem 'mailgunner'
gem 'pg'
gem 'puma', '~> 3.11'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

group :development, :test, :staging do
  gem 'awesome_print'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'recipient_interceptor'
end

group :development, :test do
  gem 'pry-byebug'
  gem 'rspec-rails'
  gem 'rubocop'
  gem 'rubocop-performance'
end

group :development do
  gem 'bullet'
  gem 'graphiql-rails'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'database_cleaner'
  gem 'devise'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
