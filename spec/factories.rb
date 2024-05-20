FactoryBot.define do
  factory :gender do
    sequence(:name, [ 'Male', 'Female', 'Other', 'Prefer Not to Say' ].cycle)
  end

  factory :title do
    sequence(:name, [ 'Mr' 'Mrs', 'Ms', 'Dr', 'Reverend' ].cycle)
  end

  factory :patient do
    first_name { 'Sam' }
    last_name { 'Smith' }

    sequence(:email) { |i| "example_#{i}@example.com" }
    sequence(:phone) { |i| "01#{i}".ljust(11) }

    gender
    title
  end
end
