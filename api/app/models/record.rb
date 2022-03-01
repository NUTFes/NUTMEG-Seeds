class Record < ApplicationRecord
  belongs_to :user
  belongs_to :curriculum
  has_one :teacher, dependent: :destroy

  def self.with_curriculum_and_teacher(record_id)
    record = Record.find(record_id)
    {
      "record": record,
      "curriculum": record.curriculum,
      "teacher": record.teacher.user.name,
      "user": record.user.name,
      "skill": record.curriculum.skill.name,
    }
  end

  def self.get_teacher(record_id)
    record = Record.find(record_id)
    {
      "id": record.teacher.id,
      "user_id": record.teacher.user.id,
      "record_id": record.id,
    }
  end
end
