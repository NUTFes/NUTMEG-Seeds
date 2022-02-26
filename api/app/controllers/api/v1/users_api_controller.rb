class Api::V1::UsersApiController < ApplicationController
  # before_action :authenticate_api_user!
  
  def get_user_with_detail_and_project_and_role_and_record
    @user = User.with_detail_and_project_and_role_and_record(params[:id])
    render json: @user
  end

  def index
    @users = User.all
    render json: @users
  end

end
