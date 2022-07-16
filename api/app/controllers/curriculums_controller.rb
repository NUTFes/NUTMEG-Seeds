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
    if @curriculum.update(curriculum_params)
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
      params.require(:curriculum).permit(:title, :content, :homework, { skill_ids: [] })
    end
end
