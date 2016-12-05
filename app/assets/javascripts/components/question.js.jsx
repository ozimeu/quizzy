var Question = React.createClass({
  getInitialState: function() {
    return {
      questions: {}
    }
  },
  addQuestion: function(question) {
    var timestamp = (new Date()).getTime();
    this.state.questions['question' + timestamp] = question;
    this.setState( { questions: this.state.questions });
  },
  renderQuestion: function(key) {
    return (
      <p className="quiz-name">Question: {this.state.questions[key].body}</p>
    )
  },
  render: function(){
    return (
      <div>
        <AddNewQuestionForm addQuestion={this.addQuestion} quiz_id={this.props.quiz_id} />
        {Object.keys(this.state.questions).map(this.renderQuestion)}
      </div>
    )
  }
})


var AddNewQuestionForm = React.createClass({
  submitNewQuestionForm: function(event) {
    event.preventDefault();
    this.props.addQuestion({body: this.refs.body.value});
    $.ajax({
      url: "/quizzes/" + this.props.quiz_id + "/questions.json",
      type: 'POST',
      dataType: "JSON",
      data: { question: {body: this.refs.body.value, quiz_id: this.props.quiz_id} },
      complete: function() {
        $('.add-question-form').hide()
        $('.add-answers-form').show()
      }
    })
  },

  render: function() {
    return (
      <form onSubmit={ this.submitNewQuestionForm } className="add-question-form">
        <input type="text" ref="body" className="form-control" placeholder="Enter the question" />
        <input type="submit" className="btn btn-lg btn-default" />
      </form>
    )
  }
});