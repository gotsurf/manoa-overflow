import React from 'react';
import { List, Header, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const courses = [
      { name: 'ICS 101', description: 'Digital Tools for the Information World' },
      { name: 'ICS 110', description: '(Alpha) Introduction to Computer Programming' },
      { name: 'ICS 111', description: 'Introduction to Computer Science I' },
      { name: 'ICS 141', description: 'Discrete Mathematics for Computer Science I' },
      { name: 'ICS 210', description: 'Information Systems in Society' },
      { name: 'ICS 211', description: 'Introduction to Computer Science II' },
      { name: 'ICS 212', description: 'Program Structure' },
      { name: 'ICS 215', description: 'Introduction to Scripting' },
      { name: 'ICS 222', description: 'Basic Concepts of Computer Science' },
      { name: 'ICS 241', description: 'Discrete Mathematics for Computer Science II' },
      {
        name: 'ICS 290',
        description: 'Computer Science Careers: An Exploration of the Specialties of Computer Science'
      },
      { name: 'ICS 311', description: 'Algorithms' },
      { name: 'ICS 312', description: 'Machine-Level and Systems Programming' },
      { name: 'ICS 313', description: 'Programming Language Theory' },
      { name: 'ICS 314', description: 'Software Engineering I' },
      { name: 'ICS 321', description: 'Data Storage and Retrieval' },
      { name: 'ICS 331', description: 'Logic Design and Microprocessors' },
      { name: 'ICS 332', description: 'Operating Systems' },
      { name: 'ICS 351', description: 'Network Design and Management' },
      { name: 'ICS 355', description: 'Security and Trust I: Resource Protections' },
      { name: 'ICS 361', description: 'Introduction to Artificial Intelligence Programming' },
      { name: 'ICS 390', description: 'Computing Ethics for Lab Assistants' },
      { name: 'ICS 414', description: ' Software Engineering II' },
      { name: 'ICS 415', description: 'Introduction to Programming for the Web' },
      { name: 'ICS 419', description: 'The Science, Psychology and Philosophy of Systems Design' },
      { name: 'ICS 421', description: 'Database Systems' },
      { name: 'ICS 422', description: 'Data Processing' },
      { name: 'ICS 423', description: 'Data Security and Cryptography I' },
      { name: 'ICS 424', description: 'Application Frameworks' },
      { name: 'ICS 425', description: 'Computer Security and Ethics' },
      { name: 'ICS 426', description: 'Computer System Security' },
      { name: 'ICS 431', description: 'Computer Architecture' },
      { name: 'ICS 432', description: 'Concurrent and High-Performance Programming' },
      { name: 'ICS 435', description: 'Machine Learning Fundamentals' },
      { name: 'ICS 441', description: 'Theory of Computation' },
      { name: 'ICS 442', description: 'Analytical Models and Methods' },
      { name: 'ICS 443', description: 'Parallel Algorithms' },
      { name: 'ICS 451', description: 'Data Networks' },
      { name: 'ICS 452', description: 'Software Design for Robotics' },
      { name: 'ICS 455', description: 'Security and Trust II: Information Assurance' },
      { name: 'ICS 461', description: 'Artificial Intelligence' },
      { name: 'ICS 462', description: 'Artificial Intelligence for Games' },
      { name: 'ICS 464', description: 'Human Computer Interaction I' },
      { name: 'ICS 465', description: 'Introduction to Hypermedia' },
      { name: 'ICS 466', description: 'Design for Mobile Devices' },
      { name: 'ICS 469', description: 'Cognitive Science' },
      { name: 'ICS 471', description: 'Probability, Statistics, and Queuing' },
      { name: 'ICS 475', description: 'Introduction to Bioinformatics Sequences and Genomes Analysis' },
      { name: 'ICS 476', description: 'Bioinformatics Algorithms and Tool Development' },
      { name: 'ICS 481', description: 'Introduction to Computer Graphics' },
      { name: 'ICS 483', description: 'Computer Vision' },
      { name: 'ICS 484', description: 'Data Visualization' },
      { name: 'ICS 485', description: 'Video Game Design and Development' },
      { name: 'ICS 491', description: 'Special Topics' },
      { name: 'ICS 495', description: 'Special Topics in Security' },
    ];

    return (
        <Container>
          <p>ManoaOverflow provides a platform for questions and answers specific to the UH Manoa ICS community.</p>
          <p>To view questions or ask questions pertaining to a course navigate to the course page below:</p>
          <Header as='h2'>Courses</Header>
          <List divided relaxed>
            {courses.map(function(course){
              return (<List.Item>
                <List.Content>
                  <List.Header as='a' href='/#/examplecourse'>{course.name}</List.Header>
                  <List.Description as='a' href='/#/examplecourse'>{course.description}</List.Description>
                </List.Content>
              </List.Item>);
            }
            )}
          </List>
        </Container>
    );
  }
}

export default Landing;
