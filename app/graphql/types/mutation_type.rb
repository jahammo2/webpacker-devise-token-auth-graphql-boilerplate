class Types::MutationType < Types::Base::Object
  field :create_foo, mutation: Mutations::CreateFooMutation
end
