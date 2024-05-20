class CreateTitles < ActiveRecord::Migration[7.1]
  def change
    create_table :titles do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :titles, :name, unique: true
  end
end
