class Type < ApplicationRecord
  has_many :users
  has_many :user_details
  has_many :skills
end
