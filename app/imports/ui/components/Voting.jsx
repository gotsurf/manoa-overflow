import React from 'react';
import { Questions, QuestionSchema } from '/imports/api/question/question';
import { Segment, Modal, Button } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Ratings} from '../../api/rating/rating';

class Voting extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Rate failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Rate succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { typeId, type, userId, upvote,  } = data;
    Ratings.insert( data );
    // eslint-disable-next-line
    window.location.reload(true);
  }
  render() {
    return (
        <div>
          {Meteor.user() && (Meteor.user().username === this.props.question.owner) ? this.renderModal() : ''}
        </div>
    );
  }
}

Voting.propTypes = {
  questionId: PropTypes.string.isRequired,

};

export default Voting;
