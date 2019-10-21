Mail.register_interceptor RecipientInterceptor.new(ENV['EMAIL_RECIPIENTS'])

load Rails.root.join('config', 'environments', 'production.rb')
