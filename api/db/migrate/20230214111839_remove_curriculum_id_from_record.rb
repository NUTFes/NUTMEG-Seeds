class RemoveCurriculumIdFromRecord < ActiveRecord::Migration[6.1]
  def change
    remove_column :records, :curriculum_id, :integer
  end
end
