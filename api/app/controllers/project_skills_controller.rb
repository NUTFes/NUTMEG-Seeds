class ProjectSkillsController < ApplicationController
  before_action :set_project_skill, only: [:show, :update, :destroy]

  # GET /project_skills
  def index
    @project_skills = ProjectSkill.all

    render json: @project_skills
  end

  # GET /project_skills/1
  def show
    render json: @project_skill
  end

  # POST /project_skills
  def create
    @project_skill = ProjectSkill.new(project_skill_params)

    if @project_skill.save
      render json: @project_skill, status: :created, location: @project_skill
    else
      render json: @project_skill.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /project_skills/1
  def update
    if @project_skill.update(project_skill_params)
      render json: @project_skill
    else
      render json: @project_skill.errors, status: :unprocessable_entity
    end
  end

  # DELETE /project_skills/1
  def destroy
    @project_skill.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_skill
      @project_skill = ProjectSkill.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_skill_params
      params.require(:project_skill).permit(:project_id, :skill_id)
    end
end
