import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { QRGenerator } from './QRGenerator/QRGenerator';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web } from "@pnp/sp/presets/all";
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
export const HelloWorld: React.FC<IHelloWorldProps> = ({ description, color, nameOfCompany, valueQrCode, context, categories, promoCode, arrayCategories }) => {
  const addBenefits = async() => {
    let idCategories: number;
    console.log(arrayCategories);
    for(let i = 0; i != arrayCategories.length; ++i){
      if(arrayCategories[i].key === categories){
        idCategories = i + 1
      }
    }
    let web = Web(context.pageContext.web.absoluteUrl);
    await web.lists.getByTitle("Benefits").items.add({
      Title: nameOfCompany,
      Description: description,
      CategoriesId: idCategories,
      QR_x002d_Code: promoCode
      
    }).then(i => {
      console.log(i)
    });
    alert("Add new Benefits")
  };

  return (
    <div className={styles.helloWorld}>
      <div className={styles.container}>
        <div className={styles.row} style={{ backgroundColor: escape(color) }}>
          <div className={styles.column}>
            <p>Name Of Company: {nameOfCompany}</p>
            <p>Description: {description}</p>
            <p>Promo-Code: {promoCode}</p>
            <p>Categories: {categories}</p>
            <button className={ styles.button} onClick={addBenefits}>Add Benefits</button>
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
