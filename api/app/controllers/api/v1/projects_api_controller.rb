class Api::V1::ProjectsApiController < ApplicationController
  def get_project_for_view
    @project = Project.with_users_and_skills(params[:id])
    render json: @project
  end
end
