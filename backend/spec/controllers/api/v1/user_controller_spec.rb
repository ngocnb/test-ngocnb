# frozen_string_literal: true

require "rails_helper"

describe "Testing api/v1/user", :type => :request do
  describe "Testing user/me with no log in user" do
    before { get "/api/v1/user/me" }

    it "returns status code 401" do
      expect(response).to have_http_status(401)
    end

    it "returns error" do
      expected = {
        "error": "Not Authorized"
      }.to_json
      expect(response.body).to eq(expected)
    end
  end

  describe "Testing user/me with correct user token" do
    let!(:user) { FactoryBot.create(:user) }

    before do
      token = ::AuthenticateUserCommand.call(user.email, user.password)
      get "/api/v1/user/me", as: :json, headers: { Authorization: "Bearer " + token.result}
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end

    it "returns user" do
      expect(JSON.parse(response.body)).to have_key("user")
    end
  end
end