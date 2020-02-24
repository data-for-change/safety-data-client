import React from 'react';
import {LanguageSelector} from './LanguageSelector'

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
      <div className="languageSelector">
        <LanguageSelector/>
      </div>
    </header> 
    );
  }
}