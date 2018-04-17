import React from 'react';
import { List, Header, Container, Image, Tab } from 'semantic-ui-react';
import { Courses } from '../../api/course/course.js';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  renderCourses() {

    return (
        <List divided relaxed>
          {this.props.courses.map(function(course){
                return (<List.Item>
                  <List.Content>
                    <List.Header as='a' href='/#/examplecourse'>{course.name}</List.Header>
                    <List.Description as='a' href='/#/examplecourse'>{course.description}</List.Description>
                  </List.Content>
                </List.Item>);
              }
          )}
        </List>
    );
  }

  render() {
    const panes = [
      { menuItem: 'Courses', render: () => <Tab.Pane>{this.renderCourses()}</Tab.Pane> },
      { menuItem: 'Questions', render: () => <Tab.Pane>List of all questions, sorted by date.</Tab.Pane> },
    ];

    return (
        <Container>
          <div id='welcome-logo'>
            <Image src='/images/WelcomeManoaOverflow.png' centered/>
          </div>
          <p>ManoaOverflow provides a platform for questions and answers specific to the UH Manoa ICS community.</p>
          <p>To view questions or ask questions pertaining to a course navigate to the course page below or browse all questions.</p>
          <Tab panes={panes} />
        </Container>
    );
  }
}

Landing.propTypes = {
  courses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Courses');
  return {
    courses: Courses.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Landing);
