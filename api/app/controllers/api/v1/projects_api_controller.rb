class Api::V1::ProjectsApiController < ApplicationController
  def get_project_for_view
    @project = Project.with_users_and_skills(params[:id])
    render json: @project
  end

  # ProjectSkillAddModal用
  def get_project_skill_for_reload_view_skill
    @skills = ProjectSkill.with_project_skill(params[:id])
    render json: @skills
  end

  # ProjectUserAddModal用
  def get_project_user_for_reload_view_user
    @user = ProjectUser.with_project_user(params[:id])
    render json: @user
  end

  def get_project_users_for_reload_view
    @users = ProjectUser.with_project_users(params[:id])
    render json: @users
  end
end
