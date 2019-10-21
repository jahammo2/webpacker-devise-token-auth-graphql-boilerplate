FactoryBot.define do
  factory :foo do
    bar { Faker::Name.first_name }
  end
end
