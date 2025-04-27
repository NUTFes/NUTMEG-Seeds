namespace :monthly_award do
  desc "Monthly Award - 毎月1日に前月のレコード数ランキングを発表"
  task monthly_award: :environment do
    
    # 毎月1日に実行される処理
    @today = Time.zone.today
    # 前月の範囲を取得
    @last_month = @today.prev_month
    # 前月の1ヶ月間のレコードを取得
    @records = Record.where(created_at: @last_month.all_month)
    # レコードのuser_idのみを取得
    @user_ids = @records.pluck(:user_id)
    # ユーザに紐づくレコード数をカウント
    ## [[user_id, count], ...] という配列が返ってくる
    @user_record_array = @user_ids.tally
    # ユーザに紐づくレコード数を降順にソート
    @sorted_user_record_array = @user_record_array.sort_by{|k, v| v}.reverse

    # ユーザに紐づくレコード数が多い順に複数人のユーザを取得
    @first_data_array = []
    @second_data_array = []
    @third_data_array = []
    @sorted_user_record_array.each_with_index do |x, i|
      if i == 0 then
        @first_data_array.push(x) 
      else
        if x[1]==@first_data_array.last[1] then
          @first_data_array.push(x)
        elsif @second_data_array.empty? then
          @second_data_array.push(x)
        elsif x[1] == @second_data_array.last[1] then
          @second_data_array.push(x)
        elsif @third_data_array.empty? then
          @third_data_array.push(x)
        elsif x[1] == @third_data_array.last[1] then
          @third_data_array.push(x)
        end
      end
    end

    # data_array を user_id 順に並べ替え
    @first_data_array = @first_data_array.sort_by{|x| x[0]}
    @second_data_array = @second_data_array.sort_by{|x| x[0]}
    @third_data_array = @third_data_array.sort_by{|x| x[0]}

    # ユーザに紐づくレコード数が多い順に複数人のユーザ名を取得
    ## 1位のユーザ名を取得
    if(!@first_data_array.empty?) then
      @first_users_name = ''
      @first_data_array.each_with_index do |x, i|
        @first_user = User.find(x[0])
        @first_users_name += ':first_place_medal: ' + @first_user.name + " \n"
      end
      # 1位のrecord数を取得
      @first_user_record_num = @first_data_array[0][1]
    end

    ## 2位のユーザ名を取得
    if(!@second_data_array.empty?) then
      @second_users_name = ''
      @second_data_array.each_with_index do |x, i|
        @second_user = User.find(x[0])
       
        @second_users_name += ':second_place_medal: ' + @second_user.name + " \n"
      end
      # 2位のrecord数を取得
      @second_user_record_num = @second_data_array[0][1]
    end
      
    ## 3位のユーザ名を取得
    if(!@third_data_array.empty?) then
      @third_users_name = ''
      @third_data_array.each_with_index do |x, i|
        @third_user = User.find(x[0])
        @third_users_name += ':third_place_medal: ' + @third_user.name + " \n"
      end
      # 3位のレコード数を取得
      @third_user_record_num = @third_data_array[0][1]
    end

    # Notification to Slack
    require 'slack-notifier'
    # slack Incomming Webhookの設定
    uri = ENV['SLACK_WEBHOOK_URL']

    # 通知内容
    attachment = {
      color: "good",
      type: "mrkdwn",
      title: ":nutmeg: #{@last_month.strftime('%Y年%m月')}のRecord数ランキングを発表します :nutmeg:",
      text: "

#{if(@first_data_array.empty?) then '' else "1位 #{@first_user_record_num}レコード \n #{@first_users_name}" end}
#{if(@second_data_array.empty?) then '' else "2位 #{@second_user_record_num}レコード \n #{@second_users_name}" end}
#{if(@third_data_array.empty?) then '' else "3位 #{@third_user_record_num}レコード \n #{@third_users_name}" end}

みなさん#{@last_month.strftime('%m月')}は多くの勉強記録を残していただきありがとうございます:clap:
#{@today.strftime('%m月')}もみんなで頑張りましょう:muscle:
      "
    }

    notifier = Slack::Notifier.new(uri)
    notifier.ping '', attachments: [ attachment ]

  end
end
