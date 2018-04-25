import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Questions } from '../../api/question/question.js';

/** Renders a table containing all of questions you have asked. */
class MyQuestions extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    // return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    return this.renderPage();
  }

  renderQuestion(question) {
    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
    };

    const date = question.dateCreated.toLocaleTimeString('en-us', options);

    return (

        <Table.Row>
          <Table.Cell>
            <Link to={`/question/${question._id}`}>
              {question.name}
            </Link>
          </Table.Cell>
          <Table.Cell>{question.courseName}</Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>

    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <Container>
          <Header as="h2" textAlign="center">My Questions</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Course</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.questions.map((question) => this.renderQuestion(question))}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

MyQuestions.propTypes = {
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Questions');
  return {
    questions: Questions.find({ owner: (Meteor.user() ? Meteor.user().username : '') }).fetch(),
    ready: subscription.ready(),
  };
})(MyQuestions);
