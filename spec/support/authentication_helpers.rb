module AuthenticationHelpers
  def sign_in(user, password = 'testtest')
    visit '/#/auth/sign-in'
    fill_in 'email', with: user.email
    fill_in 'password', with: password
    click_button 'Sign in'
  end

  def sign_out
    visit '/#/profile'
    expect(page).to have_content 'Sign out'
    click_button 'Sign out'
  end
end

RSpec.configure do |config|
  config.include AuthenticationHelpers, type: :feature
end
