import React from 'react';
import $ from 'jquery';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

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

    return (
        <Container>
          <Header as='h2'>
            <Link to={`/course/${this.props.question.courseId}`}>{this.props.question.courseName}</Link>
            {' > '}{this.props.question.title}
          </Header>
          <p>asked by <i>{this.props.question.owner}</i> on {date}</p>
          <hr/>
          <div className='question-body'>
            {this.formatCodeSnippet()}
          </div>
        </Container>
    );
  }

  formatCodeSnippet() {

    const descArray = this.props.question.question.split('`');

    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {descArray.map(function (key, index) {
            if (index % 2 === 0) {
              return <p>{key}</p>;
            }
            // eslint-disable-next-line
            return <div className={'code-snippet'}>
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
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Questions');
  return {
    question: Questions.findOne(documentId),
    ready: subscription.ready(),
  };
})(Question);
