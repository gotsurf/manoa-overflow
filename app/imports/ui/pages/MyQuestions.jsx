import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

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
          <Table.Cell>{question.answers}</Table.Cell>
        </Table.Row>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const questions = [
      {course: 'ICS 110', title: 'how do I make cool stuff', date: Date.now(), answers: 3},
      {course: 'ICS 311', title: 'how do I not die', date: Date.now()-2, answers: 4},
      {course: 'ICS 314', title: 'how do I cheat on WOD', date: Date.now()-3, answers: 2},
      {course: 'ICS 211', title: 'how do I make java beanz', date: Date.now()-4, answers: 1},
    ];

    return (
        <Container>
          <Header as="h2" textAlign="center">My Questions</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Course</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
                <Table.HeaderCell>Answers</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {questions.map((question) => this.renderQuestion(question))}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}
