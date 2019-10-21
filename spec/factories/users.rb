FactoryBot.define do
  factory :user do
    confirmed_at { Date.today }
    email { Faker::Internet.email }
    name { Faker::Name.name }
    password { 'testtest' }
    password_confirmation { password }
  end
end
