class Api::V1::CurrentUserController < ApplicationController
  #  before_action :authenticate_api_user!
  
  def get_current_user
    @user = current_api_user
    p @user
    render json: @user
  end

end
