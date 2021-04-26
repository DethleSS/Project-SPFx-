import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { QRGenerator } from './QRGenerator/QRGenerator';
import { escape } from '@microsoft/sp-lodash-subset';

export const HelloWorld: React.FC<IHelloWorldProps> = ({description, color, nameOfCompany, valueQrCode}) => {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={styles.row} style={{ backgroundColor: escape(color) }}>
            <div className={styles.column}>
              <p className={styles.description}>{escape(nameOfCompany)}</p>
              <p className={styles.description}>{escape(description)}</p>
            </div>
          </div>
          <div className={styles.row} style={{ backgroundColor: "#ffffff" }}>
            {valueQrCode ?
              <QRGenerator valueToQrCode={valueQrCode} /> :
              <h1 style={{ color: "black", textAlign: "center" }}>Enter Link</h1>
            }
          </div>
        </div>
      </div>
    );
};
