# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

GENDERS = [
  'Female',
  'Male',
  'Other',
  'Prefer not to say'
]

TITLES = [
  'Mr',
  'Mrs',
  'Miss',
  'Ms',
  'Dr',
  'Prof',
  'Rev'
]

ApplicationRecord.transaction do
  missing_genders = GENDERS - Gender.pluck(:name)
  missing_titles = TITLES - Title.pluck(:name)

  Gender.insert_all(missing_genders.map { |name| { name: } })
  Title.insert_all(missing_titles.map { |name| { name: } })
end
