class AddChapterIdFromRecord < ActiveRecord::Migration[6.1]
  def change
    add_column :records, :chapter_id, :integer
  end
end
