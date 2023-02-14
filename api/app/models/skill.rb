class Skill < ApplicationRecord
  belongs_to :category
  belongs_to :type
  has_many :curriculum_skills, dependent: :destroy
  has_many :curriculums, through: :curriculum_skills
  has_many :project_skills, dependent: :destroy
  has_many :projects, through: :project_skills
  has_many :user_skills, dependent: :destroy
  has_many :users, through: :user_skills

  def self.with_categories
    @record = Skill.eager_load(:category, :type)
      .map{
        |skill|
        {
          id: skill.id,
          name: skill.name,
          category_id: skill.category.id,
          category_name: skill.category.name,
          type_id: skill.type.id,
          type_name: skill.type.name,
          created_at: skill.created_at,
        }
    }
  end
  def self.with_category(skill_id)
    @record = Skill.eager_load(:category, :type).where(skills: {id: skill_id})
      .map{
        |skill|
        {
          id: skill.id,
          name: skill.name,
          category_id: skill.category.id,
          category_name: skill.category.name,
          type_id: skill.type.id,
          type_name: skill.type.name,
          created_at: skill.created_at,
        }
    }
  end
  def self.with_category_and_detail(skill_id)
    skill = Skill.find(skill_id)
    {
      "name": skill.name,
      "detail": skill.detail,
      "category_name": skill.category.name,
    }
  end

end
