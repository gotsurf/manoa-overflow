import React from 'react';
import { Meteor } from 'meteor/meteor';
import { List, Header, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Courses } from '../../api/course/course.js';

/** Renders a table containing all of questions you have asked. */
class MyCourses extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  /** Render the page once subscriptions have been received. */
  render() {


    return (
        <Container>
          <Header as='h2'> My Courses </Header>
          <List divided relaxed>
            {this.props.courses.map(function (course, index) {
              return (
                  <List.Item key={index}>
                    <Link to={`/course/${course._id}`}>
                      <List.Content>
                        <List.Header as='a'>{course.name}</List.Header>
                        <List.Description>{course.description}</List.Description>
                      </List.Content>
                    </Link>
                  </List.Item>);
            })}
          </List>
        </Container>
    );
  }
}

MyCourses.propTypes = {
  courses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Courses');
  return {
    courses: Courses.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MyCourses);
