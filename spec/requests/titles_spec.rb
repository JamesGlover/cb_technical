require 'rails_helper'

RSpec.describe "/titles", type: :request do
  describe "GET /index" do
    before do
      titles
      get titles_url, as: :json
    end

    let(:titles) { create_list :title, 4 }

    it "renders a successful response" do
      expect(response).to be_successful
    end

    it "includes the created titles" do
      json = JSON.parse(response.body)
      expect(json.length).to eq(4)
    end

    it "contains the title names" do
      json = JSON.parse(response.body)
      expect(json.pluck('name')).to match_array(titles.pluck(:name))
    end
  end
end
