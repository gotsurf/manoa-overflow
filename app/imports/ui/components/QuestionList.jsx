import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { List, Input, Loader } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
export default class QuestionList extends React.Component {

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
      const isMatch = result => re.test(result.name + result.question);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.questions, isMatch),
      });
    }, 300);
  };

  render() {

    const { isLoading, results } = this.state;

    let questions = this.props.questions;

    if (results.length > 0) {
      questions = results;
    }

    return (
        <div>
          <Input
              id='search-bar'
              placeholder='Search...'
              onChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          />
          {isLoading ? <Loader active>searching...</Loader> : ''}
          <List divided relaxed>
            {questions.map(function (question, index) {
              return (
                  <List.Item key={index}>
                    <Link to={`/question/${question._id}`}>
                      <List.Content>
                        <List.Header as='a'>{question.name}</List.Header>
                        <List.Description>{question.question}</List.Description>
                      </List.Content>
                    </Link>
                  </List.Item>);
            })}
          </List>
        </div>
    );
  }
}

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
};
