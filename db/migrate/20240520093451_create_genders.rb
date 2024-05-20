class CreateGenders < ActiveRecord::Migration[7.1]
  def change
    create_table :genders do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :genders, :name, unique: true
  end
end
