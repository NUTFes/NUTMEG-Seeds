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
end
