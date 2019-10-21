module EmailHelpers
  def strip_query_from_auth_email(email, initial_text, initial_path)
    email
      .body
      .raw_source
      .split('<a href="')[1]
      .split(initial_text)[0]
      .split(initial_path)[1]
  end
end

RSpec.configure do |config|
  config.include EmailHelpers, type: :feature
end
