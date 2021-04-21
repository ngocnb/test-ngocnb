FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    uid { Faker::Config.random.seed }
    password { '12345678' }
    picture { Faker::LoremFlickr.image }
  end
end