import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Table, Input, Loader, Container, Header } from 'semantic-ui-react';
import { Questions } from '../../api/question/question';
import { Courses } from '../../api/course/course';
import { Answers } from '../../api/answer/answer';

/** A simple static component to render some text for the landing page. */
export default class AdminAnswerList extends React.Component {

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.name + result.answer);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.answers, isMatch),
      });
    }, 300);
  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    const { isLoading, results } = this.state;

    const descriptionStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    let answers = this.props.answers;

    if (results.length > 0) {
      answers = results;
    }

    const listStyle = { height: '600px', overflowY: 'scroll' };

    return (
        <div>
          <Input
              id='search-bar'
              placeholder='Search...'
              onChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          />
          {isLoading ? <Loader active>searching...</Loader> : ''}
          {this.renderAnswerList(answers)}
        </div>
    );
  }
  renderAnswer(answer) {

    const question = Questions.findOne(answer.questionId);

    const course = Courses.findOne(question.courseId);

    const descriptionStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '300px',
    };

    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
    };

    const date = answer.dateCreated.toLocaleTimeString('en-us', options);

    return (
        <Table.Row>
          <Table.Cell>
            <Link to={`/question/${question._id}`}>
              {question.name}
            </Link>
          </Table.Cell>
          <Table.Cell style={descriptionStyle}>
            {answer.answer}
          </Table.Cell>
          <Table.Cell>
            <Link to={`/course/${course._id}`}>
              {course.name}
            </Link>
          </Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderAnswerList(answers) {

    return (
        <Container>
          <Header as="h2" textAlign="center">My Answers</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Answer</Table.HeaderCell>
                <Table.HeaderCell>Course</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {answers.length > 0 ?
                  answers.map((answer) => this.renderAnswer(answer)) :
                  (<div style={{ padding: '15px' }}>
                    <p>No answers to display</p>
                  </div>)
              }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}


AdminAnswerList.propTypes = {
  answers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
