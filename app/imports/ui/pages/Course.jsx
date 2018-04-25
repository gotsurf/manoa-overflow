import React from 'react';
import { Meteor } from 'meteor/meteor';
import { List, Header, Container, Loader } from 'semantic-ui-react';
import { Courses } from '/imports/api/course/course';
import { Questions } from '/imports/api/question/question';
import { withTracker } from 'meteor/react-meteor-data';
import AddQuestion from '/imports/ui/components/AddQuestion';
import { Link } from 'react-router-dom';
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
          <p>"{this.props.course.description}"</p>
          <span style={{ float: 'left', marginRight: '15px' }}>
            <Header as='h2'>Questions</Header>
          </span>
          <span>
            <AddQuestion courseId={this.props.course._id} style={{ float: 'right' }}
                         courseName={this.props.course.name}/>
          </span>
          <hr/>
          {this.props.questions.length > 0 ? this.renderQuestionList() : 'There are no questions to display.'}
        </Container>
    );
  }

  renderQuestionList() {

    const descriptionStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    return (
        <List divided relaxed>
          {this.props.questions.map(function (question, index) {
            return (
                <List.Item key={index}>
                  <Link to={`/question/${question._id}`}>
                    <List.Content>
                      <List.Header as='a'>{question.title}</List.Header>
                      <List.Description style={descriptionStyle}>
                        {question.question}
                      </List.Description>
                    </List.Content>
                  </Link>
                </List.Item>);
          })}
        </List>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
Course.propTypes = {
  course: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Courses');
  const qSubs = Meteor.subscribe('Questions');
  return {
    course: Courses.findOne(documentId),
    questions: Questions.find({ courseId: documentId }).fetch(),
    ready: (subscription.ready() && qSubs.ready()),
  };
})(Course);
