import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';


export default class CoursePageMockup extends React.Component{
  render(){
    return (
        <Container>
          <Header as='h2'>ICS 110</Header>
          <p>(Alpha) Introduction to Computer Programming</p>
          <Header as='h3'>Questions:</Header>
          <hr/>
          <List divided relaxed>
            <List.Item>
              <List.Content>
                <List.Header as='a' href='/#/examplequestion'>How do I make cool program stuff?</List.Header>
                <List.Description as='a' href='/#/examplequestion'>asked by jwoodii@hawaii.edu</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Container>
    )
  }
}