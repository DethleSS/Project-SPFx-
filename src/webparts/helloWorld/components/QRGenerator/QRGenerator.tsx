import * as React from 'react';
import { IQRGeneratorProps } from './IQRGeneratorProps';

export const QRGenerator: React.FC<IQRGeneratorProps> = ({valueToQrCode}) => {

    const [linkToQrCode, setLinkToQrCode] = React.useState<string>();

    React.useEffect((() => {
        setLinkToQrCode(`https://api.qrserver.com/v1/create-qr-code/?data=${valueToQrCode}&amp;size=100x100;`);
    }),[valueToQrCode]);
    return (
            <img src={linkToQrCode} />
    );
};
