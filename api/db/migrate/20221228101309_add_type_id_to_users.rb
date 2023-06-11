class AddTypeIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :type_id, :integer
  end
end
