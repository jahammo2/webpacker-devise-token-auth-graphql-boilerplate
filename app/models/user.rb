# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :confirmable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable

  # Overriding devise's validation so that I can
  # customize the error message
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_confirmation, presence: true, on: :create

  include DeviseTokenAuth::Concerns::User
end
