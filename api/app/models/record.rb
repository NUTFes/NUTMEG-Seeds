class Record < ApplicationRecord
  belongs_to :user
  belongs_to :chapter
  has_one :teacher, dependent: :destroy

  def self.with_curriculum_and_teacher(record_id)
    record = Record.find(record_id)
    {
      "record": record,
      "curriculum": record.chapter.nil? || record.chapter.curriculum.nil? ? nil: record.chapter.curriculum,
      "curriculum_title": record.chapter.nil? || record.chapter.curriculum.nil? ? nil: record.chapter.curriculum.title,
      "chapter": record.chapter.nil? ? nil: record.chapter,
      "teacher": record.teacher&.user&.name,
      "user": record.user&.name,  
      "skills": record.chapter.nil? || record.chapter.curriculum.nil? ? nil: record.chapter.curriculum.skills.map{
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
      .map do |record|
        {
          "id": record.id,
          "title": record.title,
          "user_id": record.user&.id,
          "user_name": record.user&.name,
          "teacher_id": record.teacher&.user&.id,
          "teacher_name": record.teacher&.user&.name,
          "chapter_id": record.chapter&.id,
          "chapter_title": record.chapter&.title,
          "curriculum_id": record.chapter&.curriculum&.id,
          "curriculum_title": record.chapter&.curriculum&.title,
          "skills": record.chapter&.curriculum&.skills&.map{ |skill| { "name": skill.name } } || [],
          "created_at": record.created_at,
          "updated_at": record.updated_at,
        }
      end
  end
  

  def self.with_teacher_and_skill(record_id)
    @record = Record.eager_load(:teacher, :chapter, :user).where(records: {id: record_id})
      .map do |record|
        {
          "id": record.id,
          "title": record.title,
          "user_id": record.user&.id,
          "user_name": record.user&.name,
          "teacher_id": record.teacher&.user&.id,
          "teacher_name": record.teacher&.user&.name,
          "chapter_id": record.chapter&.id,
          "chapter_title": record.chapter&.title,
          "skills": record.chapter&.curriculum&.skills&.map{ |skill| { "name": skill.name } } || [],
          "created_at": record.created_at,
          "updated_at": record.updated_at,
        }
      end
  end

  def self.get_teacher(record_id)
    record = Record.find(record_id)
    return nil unless record.teacher && record.teacher.user
  
    {
      "id": record.teacher.id,
      "user_id": record.teacher.user.id,
      "record_id": record.id,
    }
  end
  
end
