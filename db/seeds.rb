# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
class Seed
  def initialize
    Idea.destroy_all
  end

  def seed_ideas
    20.times do |i|
      idea = Idea.create!(
        title: Faker::Superhero.name,
        body: Faker::StarWars.quote,
        quality: [0, 1, 2].sample
      )
      puts "Created #{idea.title} idea!"
    end
  end
end

seeder = Seed.new
seeder.seed_ideas
