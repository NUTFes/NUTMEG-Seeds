class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :detail
      t.string :icon_name
      t.string :github
      t.string :remark

      t.timestamps
    end
  end
end
