import React from 'react';
import { Meteor } from 'meteor/meteor';
import { List, Header, Container, Loader } from 'semantic-ui-react';
import { Courses } from '/imports/api/course/course';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of questions you have asked. */
class Course extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as='h2'>{this.props.course.name}</Header>
          <p>{this.props.course.description}</p>
          <hr/>
          <Header as='h3'>Questions</Header>
          <List divided relaxed>
          </List>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
Course.propTypes = {
  course: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Courses');
  return {
    course: Courses.findOne(documentId),
    ready: subscription.ready(),
  };
})(Course);

