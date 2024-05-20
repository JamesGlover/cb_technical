require 'rails_helper'

RSpec.describe "/patients", type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Patient. As you add validations to Patient, be sure to
  # adjust the attributes here as well.

  let(:existing_gender) { create :gender }
  let(:existing_title) { create :title }

  let(:valid_attributes) {
    attributes_for(:patient, date_of_birth: '2012-11-01').merge({ gender: existing_gender.name, title: existing_title.name })
  }

  let(:invalid_attributes) {
    attributes_for(:patient, date_of_birth: '2012-11-01').merge({ gender: existing_gender.name, title: 'God-Emperor' })
  }

  let!(:patients) { create_list :patient, 3 }
  let(:patient) { patients.last }

  describe "GET /index" do
    before { get patients_url, as: :json }

    it "renders a successful response" do
      expect(response).to be_successful
    end

    it "includes the created patients" do
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get patient_url(patient), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Patient" do
        expect {
          post patients_url,
               params: { patient: valid_attributes }, as: :json
        }.to change(Patient, :count).by(1)
      end

      it "renders a JSON response with the new patient" do
        post patients_url,
             params: { patient: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Patient" do
        expect {
          post patients_url,
               params: { patient: invalid_attributes }, as: :json
        }.to change(Patient, :count).by(0)
      end

      it "renders a JSON response with errors for the new patient" do
        post patients_url,
             params: { patient: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_name) { 'Sharon' }
      let(:new_attributes) {
        { first_name: new_name }
      }

      it "updates the requested patient" do
        patch patient_url(patient),
              params: { patient: new_attributes }, as: :json
        patient.reload
        expect(patient.first_name).to eq(new_name)
      end

      it "renders a JSON response with the patient" do
        patch patient_url(patient),
              params: { patient: new_attributes }, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the patient" do
        patch patient_url(patient),
              params: { patient: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested patient" do
      expect {
        delete patient_url(patient), as: :json
      }.to change(Patient, :count).by(-1)
    end
  end
end
