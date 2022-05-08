class Api::V1::SkillsApiController < ApplicationController
  def get_skills_for_index
    @record = Skill.with_categories
    render json: @record
  end
  def get_skill_for_reload_index
    @record = Skill.with_category(params[:id])
    render json: @record
  end
end
