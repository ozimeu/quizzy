class RenamePollsToQuizzes < ActiveRecord::Migration[5.0]
  def change
    rename_table :polls, :quizzes
  end
end
