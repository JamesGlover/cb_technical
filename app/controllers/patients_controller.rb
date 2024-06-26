class PatientsController < ApplicationController
  before_action :set_patient, only: %i[ show update destroy ]

  # GET /patients
  def index
    @patients = Patient.include_records_for_inlining.all

    render json: @patients
  end

  # GET /patients/1
  def show
    render json: @patient
  end

  # POST /patients
  def create
    @patient = Patient.new(patient_params)

    if @patient.save
      render json: @patient, status: :created, location: @patient
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /patients/1
  def update
    if @patient.update(patient_params)
      render json: @patient
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /patients/1
  def destroy
    @patient.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      @patient = Patient.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def patient_params
      params.require(:patient)
            .permit(:first_name, :last_name, :email, :phone, :date_of_birth)
            .merge(supporting_resources)
    end

    # We hide the implementation of gender/title from the API, and allow the provision
    # of strings
    def supporting_resources
      patient = params.require(:patient)
      {
        title: Title.find_by(name: patient[:title]),
        gender: Gender.find_by(name: patient[:gender])
    }.select { |k, v| patient.include?(k) }
    end
end
