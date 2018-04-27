import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Tab } from 'semantic-ui-react';
import CourseList from '/imports/ui/components/CourseList';
import QuestionList from '/imports/ui/components/QuestionList';
import Logo from '/imports/ui/components/Logo';
import { Courses } from '../../api/course/course.js';
import { Questions } from '../../api/question/question.js';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    const panes = [

      { menuItem: 'Courses', render: () => <Tab.Pane><CourseList courses={this.props.courses}/></Tab.Pane> },
      { menuItem: 'Questions', render: () => <Tab.Pane><QuestionList questions={this.props.questions}/></Tab.Pane> },
    ];

    const animationStyle = {
      background: `url(${'/images/papers2.png'})`,
      backgroundPosition: '20% 10%',
      backgroundSize: '800px 1000px',
      backgroundRepeat: 'no-repeat',
    };

    const animationBack = {
      background: `url(${'/images/university-of-hawaii-manoa.png'})`,
      backgroundSize: '400px 400px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    return (
        <Container>
          <div className="tech-slideshow" style={animationBack}>
            <div className="mover-1" style={animationStyle}></div>
          </div>
          <Logo/>
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
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Courses');
  const subscription2 = Meteor.subscribe('Questions');
  return {
    courses: Courses.find({}).fetch(),
    questions: Questions.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready())
  };
})(Landing);
