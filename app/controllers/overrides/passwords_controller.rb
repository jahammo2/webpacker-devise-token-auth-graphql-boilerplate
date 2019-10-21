# These overrides below are for security purposes.
class Overrides::PasswordsController < DeviseTokenAuth::PasswordsController
  # For this one, I don't want someone being able to spam this endpoint and get 404s
  # if the email in their params is not in the database
  def render_not_found_error
    render_create_success
  end
end
