class BureausController < ApplicationController
  before_action :set_bureau, only: [:show, :update, :destroy]

  # GET /bureaus
  def index
    @bureaus = Bureau.all

    render json: @bureaus
  end

  # GET /bureaus/1
  def show
    render json: @bureau
  end

  # POST /bureaus
  def create
    @bureau = Bureau.new(bureau_params)

    if @bureau.save
      render json: @bureau, status: :created, location: @bureau
    else
      render json: @bureau.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bureaus/1
  def update
    if @bureau.update(bureau_params)
      render json: @bureau
    else
      render json: @bureau.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bureaus/1
  def destroy
    @bureau.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bureau
      @bureau = Bureau.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def bureau_params
      params.require(:bureau).permit(:name)
    end
end
