class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill

  def self.with_user_skills(user_id)
    @record = UserSkill.eager_load(:skill).where(user_skills: { user_id: user_id })
                       .map {
                         |user_skill|
                         {
                           "id": user_skill.skill.id,
                           "name": user_skill.skill.name,
                           "category": user_skill.skill.category.name,
                         }
                       }
  end
end
