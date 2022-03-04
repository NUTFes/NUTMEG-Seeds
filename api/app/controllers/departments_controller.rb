class DepartmentsController < ApplicationController
  before_action :set_role, only: [:show, :update, :destroy]

  # GET /departments
  def index
    @departments = Department.all

    render json: @departments
  end

  # GET /departments/1
  def show
    render json: @department
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_department
      @department = department.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def department_params
      params.require(:department).permit()
    end

end
