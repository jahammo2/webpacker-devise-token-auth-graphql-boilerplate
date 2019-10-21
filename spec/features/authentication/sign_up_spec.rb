require 'rails_helper'

feature 'As a learner, I can register so that I can use the site', js: true do
  let(:email) { Faker::Internet.email }
  let(:password) { Faker::Internet.password }
  let(:password_confirmation) { password }
  let(:user) { User.find_by(email: email) }

  subject do
    visit '/#/auth/sign-up'

    expect(page).to have_field('password')
    expect(page).to have_field('password_confirmation')
    expect(page).to have_field('email')

    fill_in 'email', with: email
    fill_in 'password', with: password
    fill_in 'password_confirmation', with: password_confirmation

    click_button 'Sign up'
  end

  context 'With valid inputs' do
    it 'creates the user and redirects' do
      subject
      expect(page).to have_content 'instructions', 'email'
      expect(page).to have_content email
      expect(current_url).to include '#/auth/sign-up-email-confirmation'
      expect(user).to be_present
    end

    it 'sends an email that links to the sign in page and the user can sign in' do
      subject
      confirm_email
      expect(page).to have_content 'confirmed', 'secure'
      expect(current_url).to include '#/auth/sign-in'
      sign_in user, password
      expect(page).to have_content 'Welcome'
    end
  end

  context 'Without an entered password confirmation' do
    let(:password_confirmation) { nil }

    it 'does not create the user and shows an error message' do
      subject
      expect(page).to have_content 'password', 'confirm'
      expect(current_url).to include '#/auth/sign-up'
      expect(user).not_to be_present
    end
  end

  context 'When the passwords do not match' do
    let(:password_confirmation) { password + 'different' }

    it 'does not create the user and shows an error message' do
      subject
      expect(page).to have_content 'match'
      expect(current_url).to include '#/auth/sign-up'
      expect(user).not_to be_present
    end
  end

  context 'When the email is already taken' do
    before do
      create(:user, email: email)
    end

    it 'does not create the user and shows an error message' do
      subject
      expect(page).to have_content 'taken'
      expect(current_url).to include '#/auth/sign-up'
    end
  end

  context 'when the email format is off' do
    let(:email) { 'badlyformattedboi' }

    it 'does not create the user and shows an error message' do
      subject
      expect(page).to have_content 'format'
      expect(current_url).to include '#/auth/sign-up'
      expect(user).not_to be_present
    end
  end

  context 'when no information is entered' do
    let(:email) { nil }
    let(:password) { nil }
    let(:password_confirmation) { nil }

    it 'does not create the user and shows an error message' do
      subject
      expect(page).to have_content 'need your email'
      expect(current_url).to include '#/auth/sign-up'
      expect(user).not_to be_present
    end
  end

  def confirm_email
    expect(page).to have_content 'instructions', 'email'
    last_email = ActionMailer::Base.deliveries.last
    query = strip_query_from_auth_email(last_email, '">Confirm', 'auth/confirmation')
    visit 'auth/confirmation' + query

    expect(page).to have_content 'confirmed', 'account'
  end
end
