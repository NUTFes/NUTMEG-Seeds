class Api::V1::CurriculumsApiController < ApplicationController

  def get_curriculums_for_index
    @curriculums = Curriculum.with_skills
    render json: @curriculums
  end

  def get_curriculum_for_reload_index
    @curriculums = Curriculum.with_skill(params[:id])
    render json: @curriculums
  end

  def get_curriculum_for_view
    @curriculum = Curriculum.with_skills_and_records(params[:id])
    render json: @curriculum
  end

  def get_curriculums_chapter_for_index
    @curriculums = Curriculum.with_chapters
    render json: @curriculums
  end

  def get_curriculum_chapter_for_view
    @curriculum = Curriculum.with_chapters(params[:id])
    render json: @curriculum
  end

  def get_curriculum_chapter_for_reload_index
    @curriculums = Curriculum.with_chapter(params[:id])
    render json: @curriculums
  end

  def get_curriculum_chapter_records_for_view
    @curriculum = Curriculum.with_chapters_and_records(params[:id])
    render json: @curriculum
  end
end
