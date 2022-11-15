namespace :monthly_award do
  desc "Monthly Award"
  task monthly_award: :environment do
    # Record.create(title: 'test', content: 'test', homework: 'test', user_id: 1, curriculum_id: 1)
    @today = Time.zone.today
    # 取得した時刻が含まれる月の範囲のデータを取得
    # 1ヶ月間のレコードを取得
    @records = Record.where(created_at: @today.all_month)
    # レコードのuser_idのみを取得
    @user_ids = @records.pluck(:user_id)
    # レコード数をカウントしてソート
    ## [[user_id, count], ...] という配列が返ってくる
    @sorted_user_ids_array = @user_ids.tally
    # 1位のuser_idを取得
    @first_user_id = @sorted_user_ids_array.max_by{|k, v| v}[0]
    # 1位のuser_idをもとにuserを取得
    @first_user = User.find(@first_user_id)
    # 2位のuser_idを取得
    @second_user_id = @sorted_user_ids_array.sort_by{|k, v| v}[1][0]
    # 2位のuser_idをもとにuserを取得
    @second_user = User.find(@second_user_id)
    # 3位のuser_idを取得
    @third_user_id = @sorted_user_ids_array.sort_by{|k, v| v}[2][0]
    # 3位のuser_idをもとにuserを取得
    @third_user = User.find(@third_user_id)

    # Notification to Slack
    require 'slack-notifier'
    # slack Incomming Webhookの設定
    uri = ENV['SLACK_WEBHOOK_URL']

    # 通知内容
    attachment = {
      color: "good",
      type: "mrkdwn",
      text: "

      :nutmeg: 今月のRecord数ランキングを発表します :nutmeg:
      :first_place_medal: #{@first_user.name}（#{@sorted_user_ids_array.max_by{|k, v| v}[1]}レコード）
      :second_place_medal: #{@second_user.name}（#{@sorted_user_ids_array.sort_by{|k, v| v}[1][1]}レコード）
      :third_place_medal: #{@third_user.name}（#{@sorted_user_ids_array.sort_by{|k, v| v}[2][1]}レコード）

      みなさん多くの勉強記録を残していただきありがとうございます:clap:
      来月もみんなで頑張りましょう:muscle:
      "
    }

    notifier = Slack::Notifier.new(uri)
    notifier.ping '', attachments: [ attachment ]

  end
end
