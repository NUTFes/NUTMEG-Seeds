class RemoveSkillIdsFromChapters < ActiveRecord::Migration[6.1]
  def change
    remove_column :chapters, :skill_ids, :integer
  end
end
