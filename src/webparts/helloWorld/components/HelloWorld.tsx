import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import QRGenerator from './QRGenerator/QRGenerator';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={styles.row} style={{ backgroundColor: escape(this.props.color) }}>
            <div className={styles.column}>
              <p className={styles.description}>{escape(this.props.nameOfCompany)}</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              
            </div>
          </div>
          <div className={styles.row} style={{ backgroundColor: "#ffffff" }}>
            {this.props.valueQrCode ?
              <QRGenerator valueToQrCode={this.props.valueQrCode}/> :      
              <h1 style={{ color: "black", textAlign: "center" }}>Enter Link</h1>
            }
          </div>
        </div>
      </div>
    );
  }
}
