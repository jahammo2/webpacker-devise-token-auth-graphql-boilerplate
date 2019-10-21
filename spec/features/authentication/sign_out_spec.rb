require 'rails_helper'

feature 'As a learner, I can sign out so that I can stop using the site for a bit', js: true do
  let!(:user) { create(:user) }

  subject do
    sign_in user
    expect(page).to have_content 'Home'
    visit '/#/profile'
    expect(page).to have_content 'Profile'
    click_button 'Sign out'
  end

  it 'signs out the user and redirects back to the sign in page' do
    subject
    expect(page).to have_content 'signed', 'out'
    expect(current_url).to include '/#/auth/sign-in'
  end

  context 'after sign out' do
    it 'keeps the user from going back to the dashboard and redirects them' do
      subject
      expect(page).to have_content 'signed', 'out'
      visit '/#'
      expect(current_url).to include '/#/auth/sign-in'
    end
  end
end
