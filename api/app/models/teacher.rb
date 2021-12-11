class Teacher < ApplicationRecord
  belongs_to :user
  belongs_to :record, dependent: :destroy
end
