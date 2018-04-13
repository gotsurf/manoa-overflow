import React from 'react';
import { Container, Header, Grid, Rating } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import Markdown from 'markdown-to-jsx';


export default class QuestionMockup extends React.Component{
  render(){
    return (
        <Container>
          <Header as='h2'>ICS 110 > How do I make cool program stuff?</Header>
          <p>asked by <a href='#'>jwoodii@hawaii.edu</a></p>
          <hr/>
          <div className='question-body'>
            <p>Rating:</p>
            <Rating icon='star' defaultRating={1} maxRating={5} />
            <Markdown options={{ forceBlock: true }}>
              I am trying to make cool program but I am noob. How do I make cool easy now?
            </Markdown>
            <Markdown>
              Here is my code:
            </Markdown>

            <Markdown>
              `System.out.println("Hello, World");`
            </Markdown>
            <Markdown>
              #### Why is it not cool?
            </Markdown>
            <Markdown>
              I need to know...
            </Markdown>
          </div>

          <Header as='h3'>1 Answer</Header>
          <hr/>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <p>Rating:</p>
                <Rating icon='star' defaultRating={5} maxRating={5} />
              </Grid.Column>
              <Grid.Column width={10}>
                <p><a href='#'>mwklam@hawaii.edu</a> said:</p>
                <Markdown options={{ forceBlock: true }}>
                  You suck
                </Markdown>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    )
  }
}