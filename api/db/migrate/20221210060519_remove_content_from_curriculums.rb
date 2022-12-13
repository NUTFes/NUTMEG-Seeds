class RemoveContentFromCurriculums < ActiveRecord::Migration[6.1]
  def change
    remove_column :curriculums, :content, :text
    remove_column :curriculums, :homework, :text
  end
end
