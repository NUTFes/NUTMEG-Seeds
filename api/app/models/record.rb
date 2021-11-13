class Record < ApplicationRecord
  belongs_to :user
  belongs_to :curriculum
  has_one :teacher, dependent: :destroy
end
