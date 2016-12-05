Rails.application.routes.draw do

  devise_scope :user do
    unauthenticated do
      root 'home#index', as: :unauthenticated_root
    end

    authenticated :user do
      root 'quizzes#new', as: :authenticated_root
    end
  end
  
  devise_for :users

  resources :quizzes do
    resources :questions
  end

  resources :questions do
    resources :answers
  end
end
