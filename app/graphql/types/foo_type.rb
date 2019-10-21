class Types::FooType < Types::Base::Object
  graphql_name 'FooType'

  field :id, ID, null: false
  field :bar, String, null: true
end
