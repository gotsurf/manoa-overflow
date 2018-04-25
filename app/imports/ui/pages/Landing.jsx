import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Image, Tab } from 'semantic-ui-react';
import CourseList from '/imports/ui/components/CourseList';
import { Courses } from '../../api/course/course.js';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    const panes = [

      { menuItem: 'Courses', render: () => <Tab.Pane><CourseList courses={this.props.courses}/></Tab.Pane> },
      { menuItem: 'Questions', render: () => <Tab.Pane>List of all questions, sorted by date.</Tab.Pane> },
    ];

    return (
        <Container>
          <div id='welcome-logo'>
            <Image src='/images/WelcomeManoaOverflow.png' centered/>
          </div>
          <p>ManoaOverflow provides a platform for questions and answers specific to the UH Manoa ICS community.</p>
          <p>To view questions or ask questions pertaining to a course navigate to the course page below or browse all
            questions.</p>
          <Tab panes={panes}/>
        </Container>
    );
  }
}

Landing.propTypes = {
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
})(Landing);
