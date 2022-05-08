class Api::V1::UsersApiController < ApplicationController
  # before_action :authenticate_api_user!

  def get_user_for_member_page
    @user = User.with_detail_and_project_and_role_and_record(params[:id])
    render json: @user
  end

  def index
    @users = User.all
    render json: @users
  end

  # UserRecordAddModal用
  def get_user_records_for_reload_view
    @records = User.with_user_records(params[:id])
    render json: @records
  end
end
