# frozen_string_literal: true

module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :verify_authenticity_token
      skip_before_action :authenticate_user

      def facebook
        graph = Koala::Facebook::API.new(params[:token])

        profile = graph.get_object("me", fields: "id, name, email, picture", )
        if (profile.key?("error"))
          render json: { error: 'Facebook authorization failed' }, status: :unauthorized
          return
        end

        password = "12345678" # default password

        user = User.where(email: profile["email"], uid: profile["id"]).first_or_initialize.tap do |user|
          user.email = profile["email"]
          user.uid = profile["id"]
          user.name = profile["name"]
          user.picture = profile["picture"]["data"]["url"]
          user.token = params[:token]
          user.password = password unless user.password != nil
          user.save!
        end
        token_command = ::AuthenticateUserCommand.call(profile["email"], password)

        if token_command.success?
          render json: { token: token_command.result }
        else
          render json: { error: token_command.errors }, status: :unauthorized
        end
      end
    end
  end
end