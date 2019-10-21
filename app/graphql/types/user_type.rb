class Types::UserType < Types::Base::Object
  graphql_name 'UserType'

  field :id, ID, null: true
  field :email, String, null: false
  field :password, String, null: true
  field :password_confirmation, String, null: true
end
