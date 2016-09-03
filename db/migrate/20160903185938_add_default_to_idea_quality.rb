class AddDefaultToIdeaQuality < ActiveRecord::Migration[5.0]
  def change
    change_column_default :ideas, :quality, 1
  end
end
