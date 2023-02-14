class Record < ApplicationRecord
  belongs_to :user
  belongs_to :chapter
  has_one :teacher, dependent: :destroy

  def self.with_curriculum_and_teacher(record_id)
    record = Record.find(record_id)
    {
      "record": record,
      "curriculum": record.curriculum,
      "curriculum_title": record.curriculum.title,
      "teacher": record.teacher.user.name,
      "user": record.user.name,
      "skills": record.curriculum.skills.map{
        |skill|
        {
          "id": skill.id,
          "name": skill.name,
        }
      }
    }
  end

  def self.with_teacher_and_skills
    @records = Record.eager_load(:teacher, :chapter, :user)
      .map{
        |record|
        {
          "id": record.id,
          "title": record.title,
          "user_id": record.user.id,
          "user_name": record.user.name,
          "teacher_id": record.teacher.nil? ? nil: record.teacher.user.id,
          "teacher_name": record.teacher.nil? ? nil: record.teacher.user.name,
          "chapter_id": record.chapter.nil? ? nil: record.chapter.id,
          "chapter_title": record.chapter.nil? ? nil: record.chapter.title,
          "skills": record.chapter.curriculum.nil? ? nil: record.chapter.curriculum.skills.map{
            |skill|
            {
              "name": skill.name,
            }
          },
          "created_at": record.created_at,
          "updated_at": record.updated_at,
        }
      }
  end

  def self.with_teacher_and_skill(record_id)
    @record = Record.eager_load(:teacher, :curriculum, :user).where(records: {id: record_id})
      .map{
        |record|
        {
          "id": record.id,
          "title": record.title,
          "user_id": record.user.id,
          "user_name": record.user.name,
          "teacher_id": record.teacher.nil? ? nil: record.teacher.user.id,
          "teacher_name": record.teacher.nil? ? nil: record.teacher.user.name,
          "chapter_id": record.chapter.id,
          "chapter_title": record.chapter.title,
          "skill": record.chapter.curriculum.skill.name,
          "created_at": record.created_at,
          "updated_at": record.updated_at,
        }
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
