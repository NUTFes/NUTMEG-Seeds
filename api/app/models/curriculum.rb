class Curriculum < ApplicationRecord
  belongs_to :skill
  has_many :records

  def self.with_skills
    @records = Curriculum.preload(:skill)
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skill": curriculum.skill.name
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
          "records": curriculum.records
        }
      }
  end

end
