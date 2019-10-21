Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    passwords: 'overrides/passwords',
  }

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/api/graphql'
  end

  get '/', to: 'pages#index'
  root 'pages#index'

  namespace :api do
    post '/graphql', to: 'graphql#execute'
  end

  # Service Worker Routes
  get '/service-worker.js' => 'service_worker#service_worker'
  get '/manifest.json' => 'service_worker#manifest'
end
