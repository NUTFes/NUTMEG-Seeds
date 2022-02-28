class Project < ApplicationRecord
  has_many :project_users, dependent: :destroy
  has_many :users, through: :project_users
  has_many :project_skills, dependent: :destroy
  has_many :skills, through: :project_skills

  def self.with_users_and_skills(project_id)
    @record = Project.eager_load(:users, :skills).where(projects: {id: project_id})
      .map{
        |project|
        {
          "project": project,
          "users": project.project_users.map {
            |project_user| 
            {
              "id": project_user.user.id,
              "name": project_user.user.name,
              "role": project_user.role.name
            }
          }, 
          "skills": project.project_skills.map {
            |project_skill| 
            {
              "id": project_skill.skill.id,
              "name": project_skill.skill.name,
              "category": project_skill.skill.category.name
            }
          }, 
        }
      }
  end
end
