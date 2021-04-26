import * as React from 'react';
import { IQRGeneratorProps } from './IQRGeneratorProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class QRGenerator extends React.Component<IQRGeneratorProps, {}> {
    private linkToQrCode: string = `https://api.qrserver.com/v1/create-qr-code/?data=${this.props.valueToQrCode}&amp;size=100x100;`;
  public render(): React.ReactElement<IQRGeneratorProps> {
    return (
        <img src={this.linkToQrCode} />
    );
  }
}
