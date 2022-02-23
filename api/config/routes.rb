Rails.application.routes.draw do
  resources :roles
  resources :bureaus
  resources :user_skills
  resources :project_users
  resources :project_skills
  resources :skills
  resources :projects
  resources :user_details
  resources :groups
  resources :curriculums
  resources :teachers
  resources :records
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'v1' do
      # users
      get "/users" => "users#index"
      get "get_role_1" => "users#get_role_1"
      get "get_role_2" => "users#get_role_2"
      get "user/:id" => "users#show"
      put "user/update/:id" => "users#update"
      get "records/:id" => "records#get_records"
      get "record/:id" => "records#get_record"
      get "get_records_from_user/:id" => "records#get_record_from_user"
      get "get_current_user" => "current_user#get_current_user"
      get "/get_curriculum_for_view/:id" => "curriculums_api#get_curriculum_for_view"
      get "/get_curriculum_for_index_view" => "curriculums_api#get_curriculum_for_index_view"
    end
  end
    namespace :api do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/auth/registrations'
      }
    end
  end
