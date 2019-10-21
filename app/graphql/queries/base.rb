class Queries::Base < GraphQL::Schema::Resolver
  include ActiveRecord
end
