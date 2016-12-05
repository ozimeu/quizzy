class AnswersController < ApplicationController
  
  def create
    answer = Answer.new(answer_params)
    respond_to do |format|
      if answer.save
        format.json { head :ok }
      end
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:body, :question_id, :correct)
  end
end
