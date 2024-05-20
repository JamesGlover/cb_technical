class GendersController < ApplicationController
  # GET /genders
  def index
    @genders = Gender.all

    render json: @genders
  end
end
