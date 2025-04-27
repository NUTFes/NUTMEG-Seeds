# wheneverにrailsを起動する必要があるためRails.rootを使用
require File.expand_path(File.dirname(__FILE__) + "/environment")

# 環境変数をうまい感じにやってくれる
ENV.each { |k, v| env(k, v) }

# # environment は設定しないと production になってしまう
# set :environment, 'development'

# 毎月1日の0時0分に実行
every '0 0 1 * *' do
  rake "monthly_award:monthly_award"
end
