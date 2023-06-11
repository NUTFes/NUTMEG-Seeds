class Chapter < ApplicationRecord
  belongs_to :curriculum
  has_many :records

  def self.with_records
    @records = Chapter.eager_load(:records)
      .map{
        |chapter|
        {
          "chapter": chapter, 
          "records": chapter.records.map{
            |record|
            {
              "id": record.id,
              "content": record.content,
              "homework": record.homework,
              "user_id": record.user_id,
              "created_at": record.created_at,
              "updated_at": record.updated_at,
              "chapter_id": record.chapter_id,              
            }
          }
        }
      }
  end

  def self.for_chapter_detail(chapter_id)
    @records = Chapter.eager_load(:records).where(chapters: {id: chapter_id})
      .map{
        |chapter|
        {
          "chapter": chapter, 
          "records": chapter.records.map{
            |record|
            {
              "id": record.id,
              "title": record.title,
              "content": record.content,
              "homework": record.homework,
              "user_id": record.user_id,
              "created_at": record.created_at,
              "updated_at": record.updated_at,
              "chapter_id": record.chapter_id,              
            }
          },
          "curriculum": chapter.curriculum,
          "skills": chapter.curriculum.skills.map{
            |skill|
            {
              "id": skill.id,
              "name": skill.name,
            }
          }
        }
      }
  end

end
