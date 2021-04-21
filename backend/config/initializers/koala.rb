Koala.configure do |config|
  config.access_token = ENV["FB_APP_ID"]
  config.app_access_token = ENV["FB_APP_SECRET"]
  # config.app_id = ENV["fb_app_id"]
  # config.app_secret = ENV["fb_app_secret"]
  # See Koala::Configuration for more options, including details on how to send requests through
  # your own proxy servers.
end