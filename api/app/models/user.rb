# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one :user_detail
  has_many :project_users
  has_many :projects, through: :project_users
  has_many :user_skills
  has_many :skills, through: :user_skills
  has_many :teachers
  has_many :records
end
