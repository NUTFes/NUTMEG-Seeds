class CreateCurriculums < ActiveRecord::Migration[6.1]
  def change
    create_table :curriculums do |t|
      t.string :title
      t.text :content
      t.text :homework
      t.integer :skill_id

      t.timestamps
    end
  end
end
