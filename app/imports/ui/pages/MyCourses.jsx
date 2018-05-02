import React from 'react';
import { Meteor } from 'meteor/meteor';
import { List, Header, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Courses } from '../../api/course/course.js';
import { CourseSubscriptions } from '../../api/courseSubscription/courseSubscription';

/** Renders a list containing all of courses you have subscribed to. */
class MyCourses extends React.Component {

  renderCourseList(courses) {
    if (courses.length > 0) {
      return (
          <List divided relaxed>
            {courses.map(function (course, index) {
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
      );
    }
    return (<p>No courses to display</p>);
  }

  /** Render the page once subscriptions have been received. */
  render() {

    const courseIds = this.props.coursesSubs.map((sub) => sub.courseId);

    const courses = courseIds.map((id) => Courses.findOne(id));

    return (
        <Container>
          <Header as='h2'> My Courses </Header>
          {this.renderCourseList(courses)}
        </Container>
    );
  }
}

MyCourses.propTypes = {
  courses: PropTypes.array.isRequired,
  coursesSubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Courses');
  const subscription2 = Meteor.subscribe('CourseSubscriptions');
  return {
    courses: Courses.find({}).fetch(),
    coursesSubs: CourseSubscriptions.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(MyCourses);
