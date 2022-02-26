class Teacher < ApplicationRecord
  belongs_to :user
  belongs_to :record, dependent: :destroy

  def to_info_h
    @teachers = Teacher.all
    return {
      "name": self.user.name
    }
  end

  def self.with_user_name
    @records = Teacher.preload(:users)
      .map{
        |teacher|
        {
          "id": teacher.id,
          "name": teacher.user.name
        }
      }
  end
end
