class QuestionsController < ApplicationController

  def create
    question = Question.new(question_params)
    respond_to do |format|
      if question.save
        format.json { head :ok }
      end
    end
  end

  private

  def question_params
    params.require(:question).permit(:body, :quiz_id)
  end

end