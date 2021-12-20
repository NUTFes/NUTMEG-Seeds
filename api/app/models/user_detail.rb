class UserDetail < ApplicationRecord
  belongs_to :user
  belongs_to :grade
  belongs_to :department
  belongs_to :bureau
end
