require 'rails_helper'

feature 'As a learner, I can reset my password so that I can get back to using the site', js: true do
  let!(:user) { create(:user) }
  let(:fill_in_email) { user.email }
  let(:new_password) { Faker::Internet.password }
  let(:password_confirmation) { new_password }

  subject do
    click_link 'Recover password'

    expect(page).to have_content 'Recover Password'
    expect(current_url).to include '#/auth/recover-password'

    fill_in 'email', with: fill_in_email

    click_button 'Email me a recovery link'
  end

  shared_examples_for 'a successful recovery' do
    it 'shows the user that instructions were sent to that email' do
      subject
      expect(page).to have_content 'sent', 'instructions'
    end
  end

  shared_examples_for 'a successful reset' do
    it 'allows the user to change their password and sign in' do
      subject
      expect(page).to have_content 'sent', 'instructions'

      follow_reset_password_link
      reset_password

      expect(page).to have_content 'Welcome', user.name
    end
  end

  shared_examples_for 'a failed reset' do
    it 'does not allow the user to reset their password and shows an error message' do
      subject
      expect(page).to have_content 'sent', 'instructions'

      follow_reset_password_link
      reset_password

      expect(page).to have_content content, extra_content
      expect(current_url).to include '#/auth/reset-password'
    end
  end

  context 'from sign up' do
    before { visit '/#/auth/sign-up' }

    it_behaves_like 'a successful recovery'
    it_behaves_like 'a successful reset'

    context 'when there is not a user associated with that email' do
      let(:fill_in_email) { 'foo@email.com' }

      it_behaves_like 'a successful recovery'

      it 'does not actually send an email' do
        expect { subject }.not_to(change { ActionMailer::Base.deliveries.count })
      end
    end

    context 'when the user did not enter anything in the email field' do
      let(:fill_in_email) { nil }

      it 'prompts the user to enter their email and does not send an email' do
        expect { subject }.not_to(change { ActionMailer::Base.deliveries.count })
        expect(page).to have_content 'Please', 'add that'
        expect(current_url).to include '#/auth/recover-password'
      end
    end

    context 'when the user\'s passwords do not match during the reset' do
      let(:password_confirmation) { new_password + 'different' }

      it_behaves_like 'a successful recovery'
      it_behaves_like 'a failed reset' do
        let(:content) { 'confirmation do not match' }
        let(:extra_content) { 'please' }
      end
    end

    context 'when the user does not enter anything in the password fields during the reset' do
      let(:new_password) { nil }
      let(:password_confirmation) { nil }

      it_behaves_like 'a successful recovery'
      it_behaves_like 'a failed reset' do
        let(:content) { 'fill in' }
        let(:extra_content) { 'password' }
      end
    end
  end

  context 'from sign in as well' do
    it 'goes to the same recovery page' do
      visit '/#/auth/sign-in'

      click_link 'Forgot password?'

      expect(page).to have_content 'Recover Password'
      expect(current_url).to include '#/auth/recover-password'
    end
  end

  def follow_reset_password_link
    last_email = ActionMailer::Base.deliveries.last
    query = strip_query_from_auth_email(last_email, '">Change', 'auth/password/edit')

    visit 'auth/password/edit' + query
  end

  def reset_password
    expect(page).to have_content 'Change Password'

    fill_in 'password', with: new_password
    fill_in 'password_confirmation', with: password_confirmation

    click_button 'Submit'
  end
end
