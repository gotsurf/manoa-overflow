import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { List, Header, Container } from 'semantic-ui-react';
// import { withTracker } from 'meteor/react-meteor-data';
// import PropTypes from 'prop-types';

/** Renders a table containing all of questions you have asked. */
export default class MyCourses extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  /** Render the page once subscriptions have been received. */
  render() {
    const courses = [
      { name: 'ICS 311', description: 'Algorithms' },
      { name: 'ICS 312', description: 'Machine-Level and Systems Programming' },
      { name: 'ICS 313', description: 'Programming Language Theory' },
      { name: 'ICS 314', description: 'Software Engineering I' },
    ];

    return (
        <Container>
          <Header as='h2'> My Courses </Header>
          <List divided relaxed>
          {courses.map(function (course) {
                return (<List.Item>
                  <List.Content>
                    <List.Header as='a' href='/#/examplecourse'>{course.name}</List.Header>
                    <List.Description as='a' href='/#/examplecourse'>{course.description}</List.Description>
                  </List.Content>
                </List.Item>);
              },
          )}
        </List>
        </Container>
    );
  }
}


