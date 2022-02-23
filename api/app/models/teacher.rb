class Teacher < ApplicationRecord
  belongs_to :user
  belongs_to :record, dependent: :destroy

  def to_info_h
    @teachers = Teacher.all
    return {
      "name": self.user.name
    }
  end
end
