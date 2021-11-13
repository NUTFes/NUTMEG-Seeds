class CreateTeachers < ActiveRecord::Migration[6.1]
  def change
    create_table :teachers do |t|
      t.integer :user_id
      t.integer :record_id

      t.timestamps
    end
  end
end
