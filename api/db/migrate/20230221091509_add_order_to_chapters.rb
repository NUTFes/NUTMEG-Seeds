class AddOrderToChapters < ActiveRecord::Migration[6.1]
  def change
    add_column :chapters, :order, :integer
  end
end
