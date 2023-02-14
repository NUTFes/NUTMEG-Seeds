class Curriculum < ApplicationRecord
  has_many :curriculum_skills, dependent: :destroy
  has_many :skills, through: :curriculum_skills
  has_many :chapters, dependent: :destroy

  def self.with_skills
    @records = Curriculum.eager_load(:skills)
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skills": curriculum.skills.map{
            |skill|
            {
              "id": skill.id,
              "name": skill.name,
            }
          }
        }
      }
  end

  def self.with_skill(curriculum_id)
    @record = Curriculum.eager_load(:skills).where(curriculums: {id: curriculum_id})
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skills": curriculum.skills.map{
            |skill|
            {
              "id": skill.id,
              "name": skill.name,
            }
          }
        }
      }
  end

  def self.with_skills_and_records(curriculum_id)
    @record = Curriculum.eager_load(:skills, :records).where(curriculums: {id: curriculum_id})
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skills": curriculum.skills.map{
            |skill|
            {
              "id": skill.id,
              "name": skill.name,
            }
          },
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

  def self.with_chapters
    @records = Curriculum.eager_load(:chapters)
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "chapters": curriculum.chapters.map{
            |chapter|
            {
              "id": chapter.id,
              "title": chapter.title,
              "content": chapter.content,
              "homework": chapter.homework,
            }
          }
        }
      }
  end

  def self.with_chapter(curriculum_id)
    @record = Curriculum.eager_load(:chapters).where(curriculums: {id: curriculum_id})
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "chapters": curriculum.chapters.map{
            |chapter|
            {
              "id": chapter.id,
              "title": chapter.title,
              "content": chapter.content,
              "homework": chapter.homework,
            }
          }
        }
      }
  end

  def self.with_chapters_and_records(curriculum_id)
    @record = Curriculum.eager_load(:chapters, :records).where(curriculums: {id: curriculum_id})
      .map{
        |curriculum|
        {
          "curriculum": curriculum,
          "skills": curriculum.skills.map{
            |skill|
            {
              "id": skill.id,
              "name": skill.name,
            }
          },
          "chapter": curriculum.chapters.map{
            |chapter|
            {
              "id": chapter.id,
              "title": chapter.title,
              "content": chapter.content,
              "homework": chapter.homework,
            }
          },
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
