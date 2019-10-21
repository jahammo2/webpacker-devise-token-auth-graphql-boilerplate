class Queries::FooQuery < Queries::Base
  type Types::FooType, null: true

  description 'Returns foo given an id'

  argument :id, ID, required: true

  def resolve(id:)
    Foo.find(id)
  end
end
