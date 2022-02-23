class Api::V1::CurriculumsApiController < ApplicationController

  def get_curriculum_for_index_view
    @curriculums = Curriculum.with_skills
    render json: @curriculums
  end

  def get_curriculum_for_view
    @curriculum = Curriculum.with_skills_and_records(params[:id])
    render json: @curriculums
  end
end
