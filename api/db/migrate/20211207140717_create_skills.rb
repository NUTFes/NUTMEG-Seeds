class CreateSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :skills do |t|
      t.string :name
      t.string :detail
      t.integer :category_id

      t.timestamps
    end
  end
end
