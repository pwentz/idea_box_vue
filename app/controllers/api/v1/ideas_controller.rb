class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all.reverse
  end

  def create
    idea = Idea.create(idea_params)
    respond_with :api, :v1, idea
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
