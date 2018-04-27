import React from 'react';
import { Container, Header, Loader, Grid } from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import { Answers } from '/imports/api/answer/answer';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import EditQuestion from '/imports/ui/components/EditQuestion';
import AddAnswer from '/imports/ui/components/AddAnswer';
import Voting from '/imports/ui/components/Voting';

class Question extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
    };

    const date = this.props.question.dateCreated.toLocaleTimeString('en-us', options);

    const currentUser = (Meteor.user() ? Meteor.user().username : '');

    return (
        <Container>
          <div className='question' style={{ marginBottom: '50px' }}>
            <Header as='h2'>
              <Link to={`/course/${this.props.question.courseId}`}>{this.props.question.courseName}</Link>
              {' > '}{this.props.question.name}
            </Header>
            <p>asked by <i>
              {this.props.question.owner === currentUser ? 'you' : this.props.question.owner}
            </i> on {date}</p>
            <Grid>
              <Grid.Column width={2}>
                <Voting typeId={this.props.question._id} type='Question'/>
              </Grid.Column>
              <Grid.Column width={10}>
                <p>description: </p>
                <div className='question-body' style={{ marginBottom: '25px' }}>
                  {this.formatCodeSnippet(this.props.question.question)}
                </div>
                <EditQuestion question={this.props.question}/>
              </Grid.Column>
            </Grid>
          </div>
          <div className='answer' style={{ marginBottom: '50px' }}>
            <Header as='h2'>
              {this.props.answers.length} {(this.props.answers.length === 1) ? 'Answer' : 'Answers'}
            </Header>
            {this.props.answers.map((answer) => this.renderAnswer(answer))}
          </div>
          <AddAnswer questionId={this.props.question._id}/>
        </Container>
    );
  }

  renderAnswer(answer) {
    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
    };

    const date = answer.dateCreated.toLocaleTimeString('en-us', options);

    const currentUser = (Meteor.user() ? Meteor.user().username : '');

    return (
        <div style={{ marginBottom: '25px' }}>
          <p>On {date} <i>
            {answer.owner === currentUser ? 'you' : answer.owner}
          </i> said:</p>
          <Grid>
            <Grid.Column width={2}>
              <Voting typeId={answer._id} type='Answer'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <div className='answer-body'>
                {this.formatCodeSnippet(answer.answer)}
              </div>
            </Grid.Column>
          </Grid>
        </div>
    );
  }

  formatCodeSnippet(snippet) {

    const descArray = snippet.split('`');

    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {descArray.map(function (key, index) {
            if (index % 2 === 0) {
              return <p key={index}>{key}</p>;
            }
            // eslint-disable-next-line
            return <div key={index} className={'code-snippet'}>
              <code>{key}</code>
            </div>;
          })}
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
Question.propTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Questions');
  const subscription1 = Meteor.subscribe('Answers');
  return {
    question: Questions.findOne(documentId),
    answers: Answers.find({ questionId: documentId }).fetch(),
    ready: (subscription.ready() && subscription1.ready()),
  };
})(Question);
