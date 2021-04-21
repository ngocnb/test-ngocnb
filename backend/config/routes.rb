Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'auth/facebook'
      get 'user/me'

      devise_for :users

    end
  end
end
