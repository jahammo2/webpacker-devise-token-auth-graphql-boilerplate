class Mutations::CreateFooMutation < Mutations::Base
  field :foo, Types::FooType, null: false

  argument :bar, String, required: true

  def resolve(args)
    outcome = Foo::Create.run(args: args)
    resolve_service(outcome: outcome)
  end
end
