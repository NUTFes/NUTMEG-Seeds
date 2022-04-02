class Api::V1::RecordsApiController < ApplicationController
  def get_records_for_index
    @record = Record.with_teacher_and_skills
    render json: @record
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
