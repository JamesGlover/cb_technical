require 'rails_helper'

RSpec.describe Title, type: :model do
  subject { build :title, name: name }

  context 'when blank' do
    let(:name) { "" }
    it { is_expected.to be_invalid }
  end

  context 'when not unique' do
    let(:name) { 'Mr' }
    before { create :title, name: name }
    it { is_expected.to be_invalid }
  end

  context 'when too long' do
    let(:name) { 'Reverend'*30 }
    it { is_expected.to be_invalid }
  end

  context 'when present and unique' do
    let(:name) { 'Mr' }
    before { create :title, name: 'Mrs' }
    it { is_expected.to be_valid }
  end
end
