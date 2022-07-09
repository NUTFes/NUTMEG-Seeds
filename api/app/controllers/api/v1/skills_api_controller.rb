class Api::V1::SkillsApiController < ApplicationController

  # UserSkillAddModal用
  def get_user_skills_for_reload_view
    @skills = UserSkill.with_user_skills(params[:id])
    render json: @skills
  end

  def get_skills_for_index
    @record = Skill.with_categories
    render json: @record
  end
    
  def get_skill_for_reload_index
    @record = Skill.with_category(params[:id])
    render json: @record
  end
  
  def get_skill_for_view
    @record = Skill.with_category_and_detail(params[:id])
    render json: @record
  end

end
