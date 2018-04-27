import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CourseSubscriptions, CourseSubscriptionSchema } from '/imports/api/courseSubscription/courseSubscription';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class SubscribeToCourse extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.state = {};
    this.formRef = null;
  }

  hasSubscription() {
    return CourseSubscriptions.findOne({ userId: this.props.userId, courseId: this.props.courseId });
  }

  submit(data) {
    const { userId, courseId } = data;
    const sub = this.hasSubscription();
    if (sub) {
      CourseSubscriptions.remove(sub._id, this.deleteCallback);
    } else {
      CourseSubscriptions.insert({ userId, courseId }, this.insertCallback);
    }
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Unsubscribe failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Unsubscribe succeeded' });
    }
    this.setState({});
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Subscribe failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Subscribe succeeded' });
    }
    this.setState({});
  }

  render() {

    const buttonParams = (this.hasSubscription() ?
        { text: 'Unsubscribe', color: 'red' } : { text: 'Subscribe', color: 'green' });

    return (
        <AutoForm ref={(ref) => {
          this.formRef = ref;
        }} schema={CourseSubscriptionSchema} onSubmit={this.submit}>
          <Button value='submit' color={buttonParams.color}>{buttonParams.text}</Button>
          <ErrorsField/>
          <HiddenField name='userId' value={Meteor.user()._id}/>
          <HiddenField name='courseId' value={this.props.courseId}/>
        </AutoForm>
    );
  }
}

SubscribeToCourse.propTypes = {
  userId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('CourseSubscriptions');
  return {
    ready: subscription.ready(),
  };
})(SubscribeToCourse);
