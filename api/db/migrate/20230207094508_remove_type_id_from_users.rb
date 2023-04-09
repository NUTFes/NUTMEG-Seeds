class RemoveTypeIdFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :type_id, :interger
  end
end
