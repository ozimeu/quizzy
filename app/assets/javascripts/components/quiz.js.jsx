var Quiz = React.createClass({
  getInitialState: function() {
    return {
      quizzes: {}
    }
  },
  addQuiz: function(quiz) {
    var timestamp = (new Date()).getTime();
    this.state.quizzes['quiz' + timestamp] = quiz;
    this.setState( { quizzes: this.state.quizzes });
    $('.add-quiz-form').slideUp()
  },
  renderQuiz: function(key) {
    var quizurl = "/quizzes/" + this.props.quiz_id + "";
    return (
        <p>
          <a href={quizurl} className="quiz-name">Quiz name: {this.state.quizzes[key].name}</a>
        </p>
    )
  },
  render: function(){
    return (
      <div>
        <h2>Create new Quiz</h2>
        <hr className="star-primary" />
        <AddNewQuizForm addQuiz={this.addQuiz} />
        {Object.keys(this.state.quizzes).map(this.renderQuiz)}
      </div>
    )
  }
});

// 
// ADD QUIZ
//

var AddNewQuizForm = React.createClass({
  submitNewQuizForm: function(event){
    event.preventDefault();
    this.props.addQuiz({name: this.refs.name.value});
    $.ajax({
      url: "/quizzes.json",
      type: 'POST',
      dataType: "JSON",
      data: { quiz: {name: this.refs.name.value} },
      complete: function(){
        $('.add-question-form').show();
      }
    })
  },

  render: function(){
    return (
      <form onSubmit={ this.submitNewQuizForm } className="add-quiz-form">
        <input type="text" ref="name" className="form-control" placeholder="Enter Quiz Name" />
        <input type="submit" className="btn btn-lg btn-default" />
      </form>
    );
  }
});