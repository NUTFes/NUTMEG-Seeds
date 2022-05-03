class Api::V1::SkillsApiController < ApplicationController

  # UserSkillAddModal用
  def get_user_skills_for_reload_view
    @skills = UserSkill.with_user_skills(params[:id])
    render json: @skills
  end
end
