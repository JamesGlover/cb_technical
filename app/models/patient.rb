class Patient < ApplicationRecord
  belongs_to :gender, class_name: "Gender"
  belongs_to :title, class_name: "Title"

  # Length limits to prevent malicious registration of incredibly long names.
  validates :first_name, presence: true, length: { maximum: 100 }
  validates :last_name, presence: true, length: { maximum: 100 }

  validates :email, presence: true, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
  validates :phone, format: /\A[0-9+]{11,}\z/
  validates :date_of_birth, presence: true, inclusion: (..Date.today.midnight)

  delegate :name, to: :gender, prefix: true
  delegate :name, to: :title, prefix: true

  scope :include_records_for_inlining, ->() { includes(:gender, :title) }
  #
  # Returns a custom json representation for the front end. Rather than just the
  # attributes, denormalizes the title and gender attributes to present them as strings.
  #
  # @return [Hash] Hash representation of the object used by the JSON serializer
  #
  def as_json(...)
    {
      # Map these attributes as-is
      id:, first_name:, last_name:, date_of_birth:, email:, phone:,
      # Delegate these to the name of the associated record
      title: title_name,
      gender: gender_name
    }
  end
end
