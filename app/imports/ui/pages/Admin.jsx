import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Tab, Loader, Header } from 'semantic-ui-react';
import AdminQuestionList from '/imports/ui/components/AdminQuestionList';
import AdminAnswerList from '/imports/ui/components/AdminAnswerList';
import { Questions } from '../../api/question/question.js';
import { Answers } from '../../api/answer/answer.js';

class Admin extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const panes = [

      {
        menuItem: 'Questions', render: () => (<Tab.Pane><AdminQuestionList
            questions={this.props.questions}
            ready={this.props.ready}/></Tab.Pane>),
      },
      {
        menuItem: 'Answers', render: () => (<Tab.Pane><AdminAnswerList
            answers={this.props.answers}
            ready={this.props.ready}/></Tab.Pane>),
      },


    ];
    return (
        <Container>
          <Header as='h1' textAlign='center'>Admin</Header>
          <Tab panes={panes}/>
        </Container>
    );
  }
}

Admin.propTypes = {
  answers: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  const subscription = Meteor.subscribe('Answers');
  const subscription2 = Meteor.subscribe('Questions');
  return {
    answers: Answers.find({}).fetch(),
    questions: Questions.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Admin);
