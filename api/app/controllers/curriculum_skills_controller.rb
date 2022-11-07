class CurriculumSkillsController < ApplicationController
  before_action :set_curriculum_skill, only: [:show, :update, :destroy]

  # GET /curriculum_skills
  def index
    @curriculum_skills = CurriculumSkill.all

    render json: @curriculum_skills
  end

  # GET /curriculum_skills/1
  def show
    render json: @curriculum_skill
  end

  # POST /curriculum_skills
  def create
    @curriculum_skill = CurriculumSkill.new(curriculum_skill_params)

    if @curriculum_skill.save
      render json: @curriculum_skill, status: :created, location: @curriculum_skill
    else
      render json: @curriculum_skill.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /curriculum_skills/1
  def update
    if @curriculum_skill.update(curriculum_skill_params)
      render json: @curriculum_skill
    else
      render json: @curriculum_skill.errors, status: :unprocessable_entity
    end
  end

  # DELETE /curriculum_skills/1
  def destroy
    @curriculum_skill.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_curriculum_skill
      @curriculum_skill = CurriculumSkill.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def curriculum_skill_params
      params.require(:curriculum_skill).permit(:curriculum_id, :skill_id)
    end
end
