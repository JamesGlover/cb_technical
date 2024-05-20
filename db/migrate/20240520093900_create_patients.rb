class CreatePatients < ActiveRecord::Migration[7.1]
  def change
    create_table :patients do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :phone
      t.date :date_of_birth, null: false

      t.references :gender, foreign_key: true
      t.references :title, foreign_key: true

      t.timestamps
    end
    add_index :patients, :email, unique: true
    add_index :patients, [ :last_name, :first_name ]
  end
end
