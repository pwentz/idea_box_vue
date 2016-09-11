class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with ideas: Idea.order('id DESC'), session: session['user_id']
  end

  def create
    idea = Idea.new(idea_params)
    idea.save if idea.valid?
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def update
    respond_with :api, :v1, Idea.update(params[:id], idea_params)
  end

  def clear
    respond_with Idea.destroy_all
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
