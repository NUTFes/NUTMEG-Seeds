class CurriculumsController < ApplicationController
  before_action :set_curriculum, only: [:show, :update, :destroy]

  # GET /curriculums
  def index
    @curriculums = Curriculum.all

    render json: @curriculums
  end

  # GET /curriculums/1
  def show
    render json: @curriculum
  end

  # POST /curriculums
  def create
    @curriculum = Curriculum.new(curriculum_params)

    if @curriculum.save
      render json: @curriculum, status: :created, location: @curriculum
    else
      render json: @curriculum.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /curriculums/1
  def update
    # curriculumと中間テーブルの更新
    if @curriculum.update(curriculum_params)
      # 中間テーブルの更新
      CurriculumSkill.where(curriculum_id: @curriculum.id).destroy_all
      curriculum_skill_params.each do |curriculum_skill|
        CurriculumSkill.create(curriculum_id: @curriculum.id, skill_id: curriculum_skill[:skill_id])
      end

      render json: @curriculum
    else
      render json: @curriculum.errors, status: :unprocessable_entity
    end
  end

  # DELETE /curriculums/1
  def destroy
    @curriculum.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_curriculum
      @curriculum = Curriculum.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def curriculum_params
      params.require(:curriculum).permit(:id, :title, :content, :homework, :created_at, :updated_at)
    end

    # curriculum_skillが複数あるので、配列で受け取る
    def curriculum_skill_params
      params.require(:curriculum_skill).map do |curriculum_skill|
        curriculum_skill.permit(:curriculum_id, :skill_id)
      end
    end
end
