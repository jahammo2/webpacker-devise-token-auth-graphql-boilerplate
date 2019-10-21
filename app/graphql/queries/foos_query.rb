class Queries::FoosQuery < Queries::Base
  type [Types::FooType], null: true

  description 'Returns a list of all Foos'

  def resolve
    Foo.all
  end
end
