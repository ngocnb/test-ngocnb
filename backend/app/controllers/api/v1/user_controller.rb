# frozen_string_literal: true

module Api
  module V1
    class UserController < ApplicationController
      # skip_before_action :verify_authenticity_token

      def me
        render json: { user: @current_user }
      end
    end
  end
end