class TitlesController < ApplicationController
  # GET /titles
  def index
    @titles = Title.all

    render json: @titles
  end
end
