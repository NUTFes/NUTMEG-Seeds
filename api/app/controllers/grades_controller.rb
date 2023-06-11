class GradesController < ApplicationController
  before_action :set_role, only: [:show, :update, :destroy]

  # GET /roles
  def index
    @grades = Grade.all

    render json: @grades
  end

  # GET /roles/1
  def show
    render json: @grade
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_grade
      @grade = grade.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def grade_params
      params.require(:grade).permit()
    end

end
