class CreateBureaus < ActiveRecord::Migration[6.1]
  def change
    create_table :bureaus do |t|
      t.string :name

      t.timestamps
    end
  end
end
