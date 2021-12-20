class Skill < ApplicationRecord
  belongs_to :category
  has_many :curriculums
  has_many :project_skills, dependent: :destroy
  has_many :projects, through: :project_skills
  has_many :user_skills, dependent: :destroy
  has_many :users, through: :user_skills
end
