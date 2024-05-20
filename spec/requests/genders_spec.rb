require 'rails_helper'

RSpec.describe "/genders", type: :request do
  describe "GET /index" do
    before do
      genders
      get genders_url, as: :json
    end

    let(:genders) { create_list :gender, 4 }

    it "renders a successful response" do
      expect(response).to be_successful
    end

    it "includes the created genders" do
      json = JSON.parse(response.body)
      expect(json.length).to eq(4)
    end

    it "contains the gender names" do
      json = JSON.parse(response.body)
      expect(json.pluck('name')).to match_array(genders.pluck(:name))
    end
  end
end
