import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { Header, MainSection } from '../../components';

import './compiler';

export class App extends React.Component<{}> {
  render() {

    const str = `
      let a = 3;
      console.log(a);
    `;

    const fn = new Function(str);
    fn();

    return (
      <div>
        <h1>hi!</h1>
      </div>
    );
  }
}