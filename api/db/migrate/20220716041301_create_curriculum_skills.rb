class CreateCurriculumSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :curriculum_skills do |t|
      t.integer :curriculum_id, foreign_key: true
      t.integer :skill_id, foreign_key: true

      t.timestamps
    end
  end
end
