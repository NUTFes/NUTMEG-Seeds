# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one :user_detail, dependent: :destroy
  has_many :project_users, dependent: :destroy
  has_many :projects, through: :project_users
  has_many :roles, through: :project_users
  has_many :user_skills, dependent: :destroy
  has_many :skills, through: :user_skills
  has_many :teachers, dependent: :destroy
  has_many :records, dependent: :destroy

  def self.with_detail_and_project_and_role_and_record(user_id)
    @record = User.eager_load(:user_detail, :projects, :roles, :records, :teachers, :skills).where(users: {id: user_id})
      .map{
        |user|
        {
          "user": user, 
          "detail": user.user_detail.to_info_h, 
          "projects": user.project_users.map {
            |project_user| 
            {
              "id": project_user.project.id,
              "project": project_user.project.name,
              "role": project_user.role.name
            }
          }, 
          "records": user.records.map {
            |record|
            {
              "record": record,
              "teacher": record.teacher.to_info_h
            }
          },
          "skills": user.skills,
        }
      }
  end
end
