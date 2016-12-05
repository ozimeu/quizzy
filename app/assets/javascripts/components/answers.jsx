var Answers = React.createClass({
  getInitialState: function() {
    return {
      answers: {}
    }
  },
  addAnswers: function(answers) {
    var timestamp = (new Date()).getTime();
    this.state.answers['answer' + timestamp] = answers;
    this.setState( { answers: this.state.answers });
  },
  renderAnswers: function(key) {
    return (
      <p className="answer-name">Answer: {this.state.answers[key].body}, {this.state.answers[key].correct.toString()} </p>
    )
  },
  render: function(){
    return (
      <div>
        <AddNewAnswersForm addAnswers={this.addAnswers} question_id={this.props.question_id} />
        {Object.keys(this.state.answers).map(this.renderAnswers)}
      </div>
    )
  }
})


var AddNewAnswersForm = React.createClass({
  submitNewAnswersForm: function(event) {
    event.preventDefault();
    this.props.addAnswers({body: this.refs.body.value, correct: this.refs.correct.checked});
    $.ajax({
      url: "/questions/" + this.props.question_id + "/answers.json",
      type: 'POST',
      dataType: "JSON",
      data: { answer: {
                body: this.refs.body.value,
                question_id: this.props.question_id,
                correct: this.refs.correct.checked
              }
            },
      complete: function() {
        $('.add-question-form').hide()
      }
    })
  },

  render: function() {
    return (
      <form onSubmit={ this.submitNewAnswersForm } className="add-answers-form">
        <input type="text" ref="body" className="form-control" placeholder="Enter the answer" />
        <input type="checkbox" ref="correct" />This answer is correct<br/>
        <input type="submit" className="btn btn-lg btn-default" value="Add Answer"/>
      </form>
    )
  }
});