class CreateRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :records do |t|
      t.string :title
      t.text :content
      t.text :homework
      t.integer :user_id

      t.timestamps
    end
  end
end
