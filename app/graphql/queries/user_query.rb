class Queries::UserQuery < Queries::Base
  type Types::UserType, null: true

  description 'Returns user given an id'

  argument :id, ID, required: true

  def resolve(id:)
    User.find(id)
  end
end
