class AddTypeIdToSkills < ActiveRecord::Migration[6.1]
  def change
    add_column :skills, :type_id, :integer
  end
end
