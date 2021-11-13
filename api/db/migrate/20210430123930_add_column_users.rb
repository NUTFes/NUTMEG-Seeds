class AddColumnUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :role_id, :integer
    add_column :users, :grade_id, :integer
    add_column :users, :department_id, :integer
    add_column :users, :pc_name, :string
    add_column :users, :pc_cpu, :string
    add_column :users, :pc_memory, :string
    add_column :users, :pc_ssd, :string
  end
end
