import React from 'react';

interface IProps {
  title: string
}
export default class Header extends React.Component <IProps> {
  render() {
    return (
      <header className="App-header">
      <h1>
        {this.props.title}
      </h1>
    </header> 
    );
  }
}