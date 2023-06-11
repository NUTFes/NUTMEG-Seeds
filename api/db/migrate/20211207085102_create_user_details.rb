class CreateUserDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :user_details do |t|
      t.integer :user_id
      t.integer :grade_id
      t.integer :department_id
      t.integer :bureau_id
      t.string :icon_name
      t.string :github
      t.string :slack
      t.string :biography
      t.string :pc_name
      t.string :pc_os
      t.string :pc_cpu
      t.string :pc_ram
      t.string :pc_storage

      t.timestamps
    end
  end
end
