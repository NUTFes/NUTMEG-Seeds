class Api::V1::ProjectsApiController < ApplicationController
  def get_project_for_view
    @project = Project.with_users_and_skills(params[:id])
    render json: @project
  end

  def get_project_skill_for_reload_view_skills
    @skills = ProjectSkill.with_project_skills(params[:id])
    render json: @skills
  end
end
