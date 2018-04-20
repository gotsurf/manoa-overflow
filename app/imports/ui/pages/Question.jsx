import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import { Courses } from '/imports/api/course/course';
import { Meteor } from 'meteor/meteor';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class Question extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Header as='h2'>{this.props.question.courseName}{' > '}{this.props.question.title}</Header>
          <p>asked by <a>{this.props.question.owner}</a></p>
          <hr/>
          <div className='question-body'>
            <Markdown options={{ forceBlock: true }}>
              {this.props.question.question}
            </Markdown>
          </div>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
Question.propTypes = {
  question: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Questions');
  const subscription1 = Meteor.subscribe('Courses');
  return {
    question: Questions.findOne(documentId),
    ready: (subscription.ready() && subscription1.ready()),
  };
})(Question);
