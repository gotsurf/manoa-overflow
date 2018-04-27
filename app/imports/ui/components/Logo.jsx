import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Logo = () => (
    <div style={{
      position: 'absolute',
      marginTop: '-400px',
      marginLeft: '40%',
      width: '850px',
    }}>
      <div id='welcome-logo-no-animation'
           style={{ position: 'relative', left: '-50%' }}>
        <Header as='h2' style={{
          fontFamily: 'Pacifico',
          fontSize: '75px', color: '#D3F8DE',
          textShadow: '3px 3px #024731, -3px -3px #024731, -3px 3px #024731, 3px -3px #024731',
        }}>
          Welcome to</Header>
        <Header as='h1' style={{
          fontFamily: 'Pacifico',
          fontSize: '100px', color: '#D3F8DE',
          textShadow: '3px 3px #024731, -3px -3px #024731, -3px 3px #024731, 3px -3px #024731',
        }}>
          <Icon name={'stack overflow'}/>
          manoaOverflow
        </Header>
      </div>
    </div>
);

export default Logo;
