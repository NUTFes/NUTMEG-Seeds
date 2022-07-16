class RemoveSkillIdFromCurriculums < ActiveRecord::Migration[6.1]
  def change
    remove_column :curriculums, :skill_id, :integer
  end
end
