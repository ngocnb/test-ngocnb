# frozen_string_literal: true

require "spec_helper"
require "rails_helper"
require "json"

describe "Testing api/v1/auth", :type => :request do
  describe "auth/facebook log in success" do
    before do
      # mock response body from facebook api
      response_body = {
        name: 'Sugaro tester',
        email: 'tester@sugaro.com',
        id: '8817277632737',
        picture: {
          data: {
            url: 'https://cdn.24h.com.vn/upload/2-2021/images/2021-04-20/vo-tu-thu-son-tai-han-quoc-ngoc-trinh-bi-dan-tinh-nem-da-khong-thuong-tiec-fni1552807902-1571123246-312-width600height900-1617090342814262313354-1618890372-379-width600height900.jpg'
          }
        }
      }

      # mock https request from facebook to get user info
      stub_request(:get, "https://graph.facebook.com/me?access_token=123456&fields=id,%20name,%20email,%20picture").
        with(
          headers: {
            'Accept'=>'*/*',
            'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
            'User-Agent'=>'Faraday v1.3.0',
          }).
        to_return(status: 200, body: response_body.to_json, headers: {})

      post "/api/v1/auth/facebook", :params => {token: '123456'}
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end

    it "returns token" do
      expect(response.body).to include("token")
    end
  end

  describe "auth/facebook log in failed" do
    before do
      # mock response body from facebook api
      response_body = {
        error: {
          message: "An active access token must be used to query information about the current user.",
          type: "OAuthException",
          code: 2500,
          fbtrace_id: "AerUotf6_KxzxFRv1v-LChf"
        }
      }

      # mock https request from facebook to get user info
      stub_request(:get, "https://graph.facebook.com/me?access_token=123456&fields=id,%20name,%20email,%20picture").
        with(
          headers: {
            'Accept'=>'*/*',
            'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
            'User-Agent'=>'Faraday v1.3.0',
          }).
        to_return(status: 200, body: response_body.to_json, headers: {})

      post "/api/v1/auth/facebook", :params => {token: '123456'}
    end

    it "returns status code 401" do
      expect(response).to have_http_status(401)
    end

    it "returns error" do
      expected = {
        "error": "Facebook authorization failed"
      }.to_json
      expect(response.body).to eq(expected)
    end
  end
end