class AddGraduationAssignmentToCurriculums < ActiveRecord::Migration[6.1]
  def change
    add_column :curriculums, :graduation_assignment, :text
  end
end
