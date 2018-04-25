import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Questions } from '../../api/question/question.js';
import { Courses } from '../../api/course/course';
import QuestionList from '/imports/ui/components/QuestionList';


/** Renders a table containing all of questions you have asked. */
export default class MyQuestions extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    // return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    return this.renderPage();
  }

  renderQuestion(question) {
    return (
        <Table.Row>
          <Table.Cell>{question.title}</Table.Cell>
          <Table.Cell>{question.course}</Table.Cell>
          <Table.Cell>{question.date}</Table.Cell>
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

Questions.propTypes = {
questions: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription2 = Meteor.subscribe('Questions');
  return {
    questions: Questions.find({ owner: Meteor.user().username}).fetch(),
    ready: subscription2.ready()
  };
})(Questions);