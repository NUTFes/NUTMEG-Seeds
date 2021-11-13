class Curriculum < ApplicationRecord
  belongs_to :category
  has_many :records
end
