import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { List, Input, Loader, Grid } from 'semantic-ui-react';
import DeleteQuestion from '/imports/ui/components/DeleteQuestion';

export default class AdminQuestionList extends React.Component {

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
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    const { isLoading, results } = this.state;

    const descriptionStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    let questions = this.props.questions;

    if (results.length > 0) {
      questions = results;
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
          {questions.length < 1 ? <p style={{ padding: '15px' }}>There are no questions to display</p> : '' }
          <List divided relaxed style={listStyle}>
            {questions.map(function (question, index) {
              return (
                  <List.Item key={index}>
                    <Grid>
                      <Grid.Column width={13}>
                        <Link to={`/question/${question._id}`}>
                          <List.Content>
                            <List.Header as='a'>{question.name}</List.Header>
                            <List.Description style={descriptionStyle}>
                              {question.question}
                            </List.Description>
                          </List.Content>
                        </Link>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <div style={{ float: 'right' }}>
                          <DeleteQuestion questionId={question._id}/>
                        </div>
                      </Grid.Column>
                    </Grid>
                  </List.Item>);
            })}
          </List>
        </div>
    );
  }
}

AdminQuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
