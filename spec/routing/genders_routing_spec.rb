require "rails_helper"

RSpec.describe GendersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/genders").to route_to("genders#index")
    end

    it "routes not to #show" do
      expect(get: "/genders/1").not_to be_routable
    end


    it "routes to #create" do
      expect(post: "/genders").not_to be_routable
    end

    it "routes to #update via PUT" do
      expect(put: "/genders/1").not_to be_routable
    end

    it "routes to #update via PATCH" do
      expect(patch: "/genders/1").not_to be_routable
    end

    it "routes to #destroy" do
      expect(delete: "/genders/1").not_to be_routable
    end
  end
end
