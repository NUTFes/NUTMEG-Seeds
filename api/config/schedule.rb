# wheneverにrailsを起動する必要があるためRails.rootを使用
require File.expand_path(File.dirname(__FILE__) + "/environment")

# 環境変数をうまい感じにやってくれる
ENV.each { |k, v| env(k, v) }

# # environment は設定しないと production になってしまう
set :environment, 'development'

every 1.minutes do
  rake "monthly_award:monthly_award"
end 