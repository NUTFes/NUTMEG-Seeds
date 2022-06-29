class RecordsController < ApplicationController
  before_action :set_record, only: [:show, :update, :destroy]

  # GET /records
  def index
    @records = Record.all

    render json: @records
  end

  # GET /records/1
  def show
    render json: @record
  end

  # POST /records
  def create
    @record = Record.new(record_params)

    if @record.save
      render json: @record, status: :created, location: @record
    else
      render json: @record.errors, status: :unprocessable_entity
    end

    # # Notification to Slack
    # require 'slack-notifier'
    # # slack Incomming Webhookの設定
    # uri = ENV['SLACK_WEBHOOK_URL']

    # # 通知内容
    # attachment = {
    #   color: "good",
    #   type: "mrkdwn",
    #   text: "

    #   「#{@record.user.name}」のRecordが追加されました
    #   Link：#{ENV['RECORD_BASE_URL'].to_s + '/records/' + @record.id.to_s}
    #   ーーーーーーーーーーーーーーーー
    #   Title：#{@record.title}
    #   Tech: #{@record.curriculum.skill.name}
    #   Curriculum: #{@record.curriculum.title}
    #   Content：
    #   #{@record.content}
    #   ーーーーーーーーーーーーーーーー

    #   "
    # }

    # notifier = Slack::Notifier.new(uri)
    # notifier.ping '', attachments: [ attachment ]
  end

  # PATCH/PUT /records/1
  def update
    if @record.update(record_params)
      render json: @record
    else
      render json: @record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /records/1
  def destroy
    @record.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_record
    @record = Record.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def record_params
    params.permit(:title, :content, :homework, :user_id, :curriculum_id)
  end
end
