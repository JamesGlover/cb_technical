class Patient < ApplicationRecord
  belongs_to :gender, class_name: "Gender"
  belongs_to :title, class_name: "Title"

  # Length limits to prevent malicious registration of incredibly long names.
  validates :first_name, presence: true, length: { maximum: 100 }
  validates :last_name, presence: true, length: { maximum: 100 }

  validates :email, presence: true, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
  validates :phone, format: /\A[0-9+]{11,}\z/
  validates :date_of_birth, presence: true, inclusion: (..Date.today.midnight)
end
