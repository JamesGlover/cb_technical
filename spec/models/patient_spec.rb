require 'rails_helper'

RSpec.describe Patient, type: :model do
  let(:factory) { :patient }
  subject(:patient) { build factory, attributes }

  shared_examples 'a required attribute' do |attribute|
    context 'when it is blank' do
      let(:attributes) { { attribute => "" } }
      it { is_expected.to be_invalid }
    end
  end

  shared_examples 'a length limited attribute' do |attribute, max|
    context "when it is longer than #{max}" do
      let(:attributes) { { attribute => "A".ljust(max+1, "A") } }
      # Length limits on name aren't really a great protector of data integrity, as
      # its a pretty unlikely human error.
      it("is invalid to prevent DOS attacks") { is_expected.to be_invalid }
    end
  end

  shared_examples 'an optional attribute' do |attribute|
    context 'when it is blank' do
      let(:attributes) { { attribute => "" } }
      it { is_expected.to be_valid }
    end
  end

  describe '#first_name' do
    it_behaves_like 'a required attribute', :first_name
    # 100 is generous, and is more than lots of government departments use. There is no
    # legal limit. This is mostly to prevent abuse by registering multi-megabyte names.
    it_behaves_like 'a length limited attribute', :first_name, 100
  end

  describe '#last_name' do
    it_behaves_like 'a required attribute', :last_name
    it_behaves_like 'a length limited attribute', :last_name, 100
  end

  describe '#email' do
    it_behaves_like 'a required attribute', :email

    # The only real way to validate an email is to send one and confirm receipt. This is
    # outside the scope of the exercise.
    context "when structured like a valid email" do
      let(:attributes) { { email: 'example@example.com' } }
      it { is_expected.to be_valid }
    end

    context "when structured like an invalid email" do
      let(:attributes) { { email: 'exampleatexample.com' } }
      it { is_expected.to be_invalid }
    end

    context "when not unique" do
      before { create factory, attributes }
      let(:attributes) { { email: 'example@example.com' } }
      it 'is invalid to ensure confidential information is not sent to a shared email' do
        expect(patient).to be_invalid
      end
    end
  end

  describe '#phone' do
    it_behaves_like 'a required attribute', :phone

    # As with an email, the only real way to validate a phone number is to ring it. This
    # is outside the scope of this exercise.
    context 'when formatted like a valid national phone-number' do
      # Offcom reserved number for TV and Radio. Avoid accidentally using a real number
      let(:attributes) { { phone: '07700900000' } }
      it { is_expected.to be_valid }
    end

    context 'when formatted like a valid international phone-number' do
      # Offcom reserved number for TV and Radio. Avoid accidentally using a real number
      let(:attributes) { { phone: '+447700900000' } }
      it { is_expected.to be_valid }
    end

    context 'when not a number' do
      let(:attributes) { { phone: 'not_a_number' } }
      it { is_expected.to be_invalid }
    end
  end

  describe '#date_of_birth' do
    context 'when not a date' do
      let(:attributes) { { date_of_birth: 'yesterday' } }
      it { is_expected.to be_invalid }
    end

    context 'when in the future' do
      let(:attributes) { { date_of_birth: 2.years.from_now } }

      it { is_expected.to be_invalid }

      it 'has a useful error message' do
        patient.valid?
        expect(patient.errors.full_messages).to include('Date of birth can\'t be in the future')
      end
    end

    context 'when reasonable' do
      let(:attributes) { { date_of_birth: 20.years.ago } }
      it { is_expected.to be_valid }
    end

    context 'when today' do
      let(:attributes) { { date_of_birth: Date.today } }
      it { is_expected.to be_valid }
    end
  end

  describe '#gender' do
    context 'when not provided' do
      let(:attributes) { { gender: nil } }
      it { is_expected.to be_invalid }
    end
  end

  describe '#title' do
    context 'when not provided' do
      let(:attributes) { { title: nil } }
      it { is_expected.to be_invalid }
    end
  end
end
