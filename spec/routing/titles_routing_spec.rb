require "rails_helper"

RSpec.describe TitlesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/titles").to route_to("titles#index")
    end

    it "routes to #show" do
      expect(get: "/titles/1").not_to be_routable
    end


    it "routes to #create" do
      expect(post: "/titles").not_to be_routable
    end

    it "routes to #update via PUT" do
      expect(put: "/titles/1").not_to be_routable
    end

    it "routes to #update via PATCH" do
      expect(patch: "/titles/1").not_to be_routable
    end

    it "routes to #destroy" do
      expect(delete: "/titles/1").not_to be_routable
    end
  end
end
