class Types::QueryType < Types::Base::Object
  field :foo, resolver: Queries::FooQuery
  field :foos, resolver: Queries::FoosQuery
  field :user, resolver: Queries::UserQuery
end
