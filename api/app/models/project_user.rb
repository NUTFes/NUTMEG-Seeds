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
end
