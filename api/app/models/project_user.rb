class ProjectUser < ApplicationRecord
  belongs_to :project
  belongs_to :user
  belongs_to :role

  def self.with_project_user(project_user_id)
    @record = ProjectUser.eager_load(:user).where(project_users: { id: project_user_id })
                         .map {
                           |project_user|
                           {
                             "id": project_user.user.id,
                             "name": project_user.user.name,
                             "role": project_user.role.name,
                           }
                         }
  end

  def self.with_project_users(project_id)
    @record = ProjectUser.eager_load(:user).where(project_users: { project_id: project_id })
                         .map {
                           |project_user|
                           {
                             "id": project_user.user.id,
                             "name": project_user.user.name,
                             "role": project_user.role.name,
                           }
                         }
  end

  def self.with_user_projects(user_id)
    @record = ProjectUser.eager_load(:project).where(project_users: { user_id: user_id })
                         .map {
                           |project_user|
                           {
                             "id": project_user.project.id,
                             "project": project_user.project.name,
                             "role": project_user.role.name,
                           }
                         }
  end
end
