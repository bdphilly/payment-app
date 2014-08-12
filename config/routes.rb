Plastiq::Application.routes.draw do

  root to: 'payees#plastiq'

  get '/index', to: 'payees#index'  
  resources :payees

end
