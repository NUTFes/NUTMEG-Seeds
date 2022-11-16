class RemoveSkillIdFromCurriculums < ActiveRecord::Migration[6.1]
  def change
    rename_column :curriculums, :skill_id, :skill_ids 
  end
end
