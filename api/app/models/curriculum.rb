class Curriculum < ApplicationRecord
  belongs_to :skill
  has_many :records
end
