import React from 'react';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { List, Header, Container } from 'semantic-ui-react';
import { Courses } from '../../api/course/course.js';
import { Questions } from '../../api/question/question';
import CourseList from '/imports/ui/components/CourseList';
// import { withTracker } from 'meteor/react-meteor-data';
// import PropTypes from 'prop-types';

/** Renders a table containing all of questions you have asked. */
export default class MyCourses extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  /** Render the page once subscriptions have been received. */
  render() {


    return (
        <Container>
          <Header as='h2'> My Courses </Header>
          <List divided relaxed>
            {courses.map(function (course, index) {
              return (<List.Item key={index}>
                <List.Content>
                  <List.Header as='a' href='/#/examplecourse'>{course.name}</List.Header>
                  <List.Description as='a' href='/#/examplecourse'>{course.description}</List.Description>
                </List.Content>
              </List.Item>);
            })}
          </List>
        </Container>
    );
  }
}

Courses.propTypes = {
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Questions');
  return {
    questions: Questions.find({}).fetch(),
    ready: subscription.ready()
  };
})(Courses);