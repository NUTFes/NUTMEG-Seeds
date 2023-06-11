class Api::V1::ChaptersApiController < ApplicationController

  def get_chapters_for_index
    @chapters = Chapter.for_chapter_index
    render json: @chapters
  end

  def get_chapter_for_detail
    @chapters = Chapter.for_chapter_detail(params[:id])
    render json: @chapters[0]
  end

end
