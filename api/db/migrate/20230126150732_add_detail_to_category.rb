class AddDetailToCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :detail, :string
  end
end
