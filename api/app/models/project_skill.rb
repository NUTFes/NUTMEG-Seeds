class ProjectSkill < ApplicationRecord
  belongs_to :project
  belongs_to :skill

  def self.with_project_skills(project_skill_id)
    @record = ProjectSkill.eager_load(:skill).where(project_skills: { id: project_skill_id })
                          .map {
                            |project_skill|
                            {
                              "id": project_skill.skill.id,
                              "name": project_skill.skill.name,
                              "category": project_skill.skill.category.name,
                            }
                          }
  end
end
