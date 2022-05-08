class Teacher < ApplicationRecord
  belongs_to :user
  belongs_to :record, dependent: :destroy

  def to_info_h
    return {
      "id": self.user.id,
      "name": self.user.name,
    }
  end

  def self.with_user_name
    @records = Teacher.eager_load(:users)
                      .map {
                        |teacher|
                        {
                          "id": teacher.id,
                          "name": teacher.user.name
                        }
                      }
  end
end
