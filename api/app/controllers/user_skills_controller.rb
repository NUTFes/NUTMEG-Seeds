class UserSkillsController < ApplicationController
  before_action :set_user_skill, only: [:show, :update, :destroy]

  # GET /user_skills
  def index
    @user_skills = UserSkill.all

    render json: @user_skills
  end

  # GET /user_skills/1
  def show
    render json: @user_skill
  end

  # POST /user_skills
  def create
    @user_skill = UserSkill.new(user_skill_params)

    if @user_skill.save
      render json: @user_skill, status: :created, location: @user_skill
    else
      render json: @user_skill.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_skills/1
  def update
    if @user_skill.update(user_skill_params)
      render json: @user_skill
    else
      render json: @user_skill.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_skills/1
  def destroy
    @user_skill.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_skill
      @user_skill = UserSkill.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_skill_params
      params.require(:user_skill).permit(:user_id, :skill_id)
    end
end
