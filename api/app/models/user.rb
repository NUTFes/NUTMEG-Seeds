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

  def self.user_and_user_detail()
    @records = User.eager_load(:user_detail)
                  .map {
                    |user|
                    {
                      "user": user,
                      "detail": user.user_detail.to_info_h,
                    }
                  }
  end

  def self.with_detail_and_project_and_role_and_record_and_type()
    @records = User.eager_load(:user_detail, :projects, :roles, :records, :teachers, :skills)
                  .map {
                    |user|
                    {
                      "user": user,
                      "type": user.user_detail.type.name,
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
                          "id": record.id,
                          "title": record.title,
                          "teacher": record.teacher.nil? ? nil : record.teacher.user,
                        }
                      },
                      "skills": user.skills.map {
                        |skill|
                        {
                          "id": skill.id,
                          "name": skill.name,
                          "category": skill.category.name
                        }
                      },
                    }
                  }
  end

  # UserRecordAddModal
  def self.with_user_records(user_id)
    @record = User.eager_load(:records, :teachers).where(users: { id: user_id })
                  .map {
                    |user|
                    {
                      "records": user.records.map {
                        |record|
                        {
                          "id": record.id,
                          "title": record.title,
                          "teacher": record.teacher.nil? ? nil : record.teacher.user,
                        }
                      },
                    }
                  }
  end

end
