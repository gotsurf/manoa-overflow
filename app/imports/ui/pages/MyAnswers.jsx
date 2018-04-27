import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Answers } from '/imports/api/answer/answer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Courses } from '../../api/course/course';
import { Questions } from '../../api/question/question';

/** Renders a table containing all of questions you have asked. */
class MyAnswers extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderAnswer(answer) {

    const question = Questions.findOne(answer.questionId);

    const course = Courses.findOne(question.courseId);

    const descriptionStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '300px',
    };

    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
    };

    const date = answer.dateCreated.toLocaleTimeString('en-us', options);

    return (
        <Table.Row>
          <Table.Cell>
            <Link to={`/question/${question._id}`}>
              {question.name}
            </Link>
          </Table.Cell>
          <Table.Cell style={descriptionStyle}>
            {answer.answer}
          </Table.Cell>
          <Table.Cell>
            <Link to={`/course/${course._id}`}>
              {course.name}
            </Link>
          </Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const answers = this.props.answers;

    return (
        <Container>
          <Header as="h2" textAlign="center">My Answers</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Answer</Table.HeaderCell>
                <Table.HeaderCell>Course</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {answers.length > 0 ?
                answers.map((answer) => this.renderAnswer(answer)) :
                  (<div style={{ padding: '15px' }}>
                    <p>No answers to display</p>
                  </div>)
              }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

MyAnswers.propTypes = {
  answers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Answers');
  const subscription1 = Meteor.subscribe('Questions');
  const subscription2 = Meteor.subscribe('Courses');
  return {
    answers: Answers.find({ owner: (Meteor.user() ? Meteor.user().username : '') }).fetch(),
    ready: (subscription.ready() && subscription1.ready() && subscription2.ready()),
  };
})(MyAnswers);
