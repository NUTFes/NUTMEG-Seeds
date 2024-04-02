class AddReleaseToRecords < ActiveRecord::Migration[6.1]
  def change
    add_column :records, :release, :boolean, null: false, default: false
  end
end
