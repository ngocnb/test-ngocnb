class ApplicationController < ActionController::Base
  # before_action :authenticate_user!
  include TokenAuthenticatable
  # include AdminAuthorizable
end
