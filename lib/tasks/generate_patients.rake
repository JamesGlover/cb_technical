namespace "db" do
  FIRST_NAMES = [ "Robin", "Sam", "James", "Wendy", "Joe", "Muhammad", "Kim", "Amelie", "Isla" ]
  LAST_NAMES = [ "Smith", "Green", "Jones", "Singh", "Woo", "McWilliams", "Parker-Green" ]

  desc "Build some dummy patients for development"
  task create_patients: [ :environment ] do
    genders = Gender.all.to_a
    titles = Title.all.to_a

    patient_data = Array.new(15) do |i|
      first_name = FIRST_NAMES.sample
      last_name = LAST_NAMES.sample
      {
        first_name:,
        last_name:,
        date_of_birth: rand(110.years.ago.. 1.day.ago),
        email: "#{first_name}_#{last_name}_#{i}@example.com",
        gender_id: genders.sample.id,
        title_id: titles.sample.id,
        phone: "01#{i}".ljust(11, "0")
      }
    end
    Patient.insert_all(patient_data)
  end
end
