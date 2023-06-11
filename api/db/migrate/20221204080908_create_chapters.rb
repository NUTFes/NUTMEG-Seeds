class CreateChapters < ActiveRecord::Migration[6.1]
  def change
    create_table :chapters do |t|
      t.string :title
      t.text :content
      t.text :homework
      t.integer :skill_ids
      t.integer :curriculum_id

      t.timestamps
    end
  end
end
