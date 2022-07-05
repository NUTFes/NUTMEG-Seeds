Rails.application.routes.draw do
  resources :roles
  resources :grades
  resources :departments
  resources :bureaus
  resources :user_skills
  resources :project_users
  resources :project_skills
  resources :skills
  resources :projects
  resources :user_details
  resources :groups
  resources :curriculums
  resources :categories
  resources :teachers
  resources :records
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'v1' do
      # users
      get "/users" => "users_api#index"
      get "/get_user_for_member_page/:id" => "users_api#get_user_for_member_page"
      get "user/:id" => "users#show"
      put "user/update/:id" => "users#update"
      get "get_current_user" => "current_user#get_current_user"
      get "/get_user_skills_for_reload_view/:id" => "skills_api#get_user_skills_for_reload_view"
      get "/get_user_records_for_reload_view/:id" => "users_api#get_user_records_for_reload_view"

      # role
      get "get_role_1" => "users#get_role_1"
      get "get_role_2" => "users#get_role_2"

      # record
      get "records/:id" => "records#get_records"
      get "/record/:id" => "records_api#get_record"
      get "/get_teacher_by_record/:id" => "records_api#get_teacher_by_record"
      get "/get_records_for_index" => "records_api#get_records_for_index"
      get "/get_record_for_index_reload/:id" => "records_api#get_record_for_index_reload"
      get "/get_record_for_view/:id" => "records_api#get_record_for_view"
      get "get_records_from_user/:id" => "records#get_record_from_user"

      # curriculum
      get "get_current_user" => "current_user#get_current_user"
      get "/get_curriculum_for_view/:id" => "curriculums_api#get_curriculum_for_view"
      get "/get_curriculums_for_index" => "curriculums_api#get_curriculums_for_index"
      get "/get_curriculum_for_reload_index/:id" => "curriculums_api#get_curriculum_for_reload_index"

      # project
      get "/get_project_for_view/:id" => "projects_api#get_project_for_view"
      get "/get_project_skill_for_reload_view_skill/:id" => "projects_api#get_project_skill_for_reload_view_skill"
      get "/get_project_user_for_reload_view_user/:id" => "projects_api#get_project_user_for_reload_view_user"
      get "/get_project_user_for_reload_view_project/:id" => "projects_api#get_project_user_for_reload_view_project"
      get "/get_project_users_for_reload_view/:id" => "projects_api#get_project_users_for_reload_view"

      # For Skill
      get "/get_skills_for_index" => "skills_api#get_skills_for_index"
      get "/get_skill_for_reload_index/:id" => "skills_api#get_skill_for_reload_index"
      get "/get_skill_for_view/:id" => "skills_api#get_skill_for_view"

    end
  end
  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'api/auth/registrations'
    }
  end
end
