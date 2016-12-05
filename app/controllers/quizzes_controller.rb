class QuizzesController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def show
    quiz = Quiz.find(params[:id])
    questions = Question.where(quiz_id: quiz.id)

    render locals: { quiz: quiz, questions: questions }
  end

  def create
    quiz = Quiz.new(quiz_params)
    respond_to do |format|
      if quiz.save
        format.json { head :ok }
      end
    end
  end

  private

  def quiz_params
    params.require(:quiz).permit(:name)
  end

end