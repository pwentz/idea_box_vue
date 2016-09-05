Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  get '/ideas', to: 'ideas#index', as: 'ideas'

  namespace :api do
    namespace :v1 do
      resources :ideas, except: [:show, :new, :edit]
    end
  end

  get '/api/v1/ideas/clear', to: 'api/v1/ideas#clear'
end
