class Project < ApplicationRecord
  has_many :project_users, dependent: :destroy
  has_many :users, through: :project_users
  has_many :project_skills, dependent: :destroy
  has_many :skills, through: :project_skills
end
