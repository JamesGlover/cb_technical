require 'rails_helper'

RSpec.describe Gender, type: :model do
  subject { build :gender, name: name }

  context 'when blank' do
    let(:name) { "" }
    it { is_expected.to be_invalid }
  end

  context 'when not unique' do
    let(:name) { 'Female' }
    before { create :gender, name: name }
    it { is_expected.to be_invalid }
  end

  context 'when too long' do
    let(:name) { 'Other'*30 }
    it { is_expected.to be_invalid }
  end

  context 'when present and unique' do
    let(:name) { 'Female' }
    before { create :gender, name: 'Male' }
    it { is_expected.to be_valid }
  end
end
