class AddTypeIdToUserDetails < ActiveRecord::Migration[6.1]
  def change
    add_column :user_details, :type_id, :integer
  end
end
