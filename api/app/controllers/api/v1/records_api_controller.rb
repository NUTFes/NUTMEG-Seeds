class Api::V1::RecordsApiController < ApplicationController
  def get_records
    user = User.find(params[:id])
    records = user.records.order(updated_at: "DESC")
    render json: records
  end

  def get_record
    record = Record.find(params[:id])
    teacher = record.teacher.user.name
    user = record.user.name
    teacher_id = record.teacher.user_id
    render json: 
      { 
        record: record, 
        teacher: teacher,
        user: user,
        teacher_id: teacher_id
      }
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
