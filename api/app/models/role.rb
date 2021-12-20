class Role < ApplicationRecord
  has_many :users, through: :project_users
  has_many :projects, through: :project_users
end
