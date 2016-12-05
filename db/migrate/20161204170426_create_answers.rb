class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.string :body
      t.boolean :correct
      t.references :question
    end
  end
end
