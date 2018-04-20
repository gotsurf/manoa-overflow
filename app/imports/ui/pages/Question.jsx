import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import { Meteor } from 'meteor/meteor';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class Question extends React.Component {
  render() {
    return (
        <Container>
          <Header as='h2'>ICS 110 > How do I make cool program stuff?</Header>
          <p>asked by <a>{this.props.question.owner}</a></p>
          <hr/>
          <div className='question-body'>
            <p>Rating:</p>
            <Markdown options={{ forceBlock: true }}>
              {'stuff'}
            </Markdown>
          </div>

        </Container>
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
    course: Questions.findOne(documentId),
    ready: subscription.ready(),
  };
})(Question);