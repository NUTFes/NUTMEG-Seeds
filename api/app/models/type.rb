class Type < ApplicationRecord
  has_many :users
  has_many :user_detail
  has_many :skills
end
