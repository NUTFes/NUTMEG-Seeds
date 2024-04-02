class Api::V1::RecordsApiController < ApplicationController
  def get_records_for_index
    # releaseカラムがtrueになっているレコードのみを取得
    @records = Record.where(release: true).with_teacher_and_skills
    render json: @records
  end

  def get_record_for_index_reload
    @record = Record.with_teacher_and_skill(params[:id])
    render json: @record
  end

  def get_record_for_view
    @record = Record.with_curriculum_and_teacher(params[:id])
    render json: @record
  end

  def get_teacher_by_record
    @record = Record.get_teacher(params[:id])
    render json: @record
  end

  # app/controllers/api/v1/records_api_controller.rb
  def get_drafts_for_user
    user_id = params[:user_id] # または、認証されたユーザーのIDを直接取得
    @records = Record.where(user_id: user_id, release: false)
    render json: @records
  end

  def get_record_from_user
    user = User.find(params[:id])
    teachers = user.teachers.order(updated_at: "DESC")
    records = []
    for teacher in teachers
      records << teacher.record
    end
    render json: records
  end

end
