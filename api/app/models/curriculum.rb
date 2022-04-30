class Curriculum < ApplicationRecord
  belongs_to :skill
  has_many :records

  def self.with_skills
    @records = Curriculum.eager_load(:skill)
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skill": curriculum.skill.name
        }
      }
  end

  def self.with_skill(curriculum_id)
    @record = Curriculum.eager_load(:skill).where(curriculums: {id: curriculum_id})
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skill": curriculum.skill.name,
        }
      }
  end

  def self.with_skills_and_records(curriculum_id)
    @record = Curriculum.eager_load(:skill, :records).where(curriculums: {id: curriculum_id})
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skill": curriculum.skill.name,
          "records": curriculum.records.map{
            |record|
            {
              "id": record.id,
              "title": record.title,
              "user": record.user.name,
              "created_at": record.created_at,
              "updated_at": record.updated_at,
            }
          }
        }
      }
  end

end
