require 'rails_helper'

feature 'As a learner, I can register so that I can use the site', js: true do
  let(:password) { Faker::Internet.password }
  let(:fill_in_email) { user.email }
  let(:fill_in_password) { password }
  let!(:user) { create(:user, password: password) }

  subject do
    visit '/#/auth/sign-in'

    expect(page).to have_field('email')
    expect(page).to have_field('password')

    fill_in 'email', with: fill_in_email
    fill_in 'password', with: fill_in_password

    click_button 'Sign in'
  end

  context 'With valid inputs' do
    it 'signs in the user and redirects' do
      subject
      expect(page).to have_content user.name
      expect(current_url).not_to include '/#/auth/sign-in'
    end
  end

  context 'When the password is not correct' do
    let(:fill_in_password) { Faker::Internet.password + 'foo' }

    it 'does not create the user and shows an error message' do
      subject
      expect(page).to have_content 'password', 'not match'
      expect(current_url).to include '/#/auth/sign-in'
    end
  end

  context 'When the email has not been confirmed' do
    let!(:user) { create(:user, password: password, confirmed_at: nil) }

    it 'does not create the user and shows an error message' do
      subject
      expect(page).to have_content 'email', 'confirmation'
      expect(page).to have_content user.email
      expect(current_url).to include '/#/auth/sign-in'
    end
  end
end
