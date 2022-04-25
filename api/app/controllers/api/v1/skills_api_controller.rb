class Api::V1::SkillsApiController < ApplicationController
  def get_skills_for_index
    @record = Skill.with_category
    render json: @record
  end
end
