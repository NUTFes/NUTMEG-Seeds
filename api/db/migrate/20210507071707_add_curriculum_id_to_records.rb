class AddCurriculumIdToRecords < ActiveRecord::Migration[6.1]
  def change
    add_column :records, :curriculum_id, :integer
  end
end
