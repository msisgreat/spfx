import * as React from 'react';
import styles from './Msisgreat.module.scss';
import { IMsisgreatProps } from './IMsisgreatProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Feedback from './Feedback';

export default class Msisgreat extends React.Component<IMsisgreatProps, {}> {
  public render(): React.ReactElement<IMsisgreatProps> {
    return (
      <div className={ styles.msisgreat }>
       <div className="container-fluid">
         <Feedback></Feedback>         
       </div>
      </div>
    );
  }
}
