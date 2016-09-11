class Idea < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
  enum quality: ['swill', 'plausible', 'genius']
end
