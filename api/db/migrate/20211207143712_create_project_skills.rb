class CreateProjectSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :project_skills do |t|
      t.integer :project_id
      t.integer :skill_id

      t.timestamps
    end
  end
end
