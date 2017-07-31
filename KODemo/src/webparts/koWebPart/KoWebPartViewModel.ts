import * as ko from 'knockout';
import styles from './KoWebPart.module.scss';
import { IKoWebPartWebPartProps } from './IKoWebPartWebPartProps';

export interface IKoWebPartBindingContext extends IKoWebPartWebPartProps {
  shouter: KnockoutSubscribable<{}>;
  userName: string;
  license: string;
  groups: string[];
}

export default class KoWebPartViewModel {
  public description: KnockoutObservable<string> = ko.observable('');
  public userName: KnockoutObservable<string> = ko.observable('');
  public license: KnockoutObservable<string> = ko.observable('');
  public groups: KnockoutObservableArray<string> = ko.observableArray([]);

  public labelClass: string = styles.label;
  public koWebPartClass: string = styles.koWebPart;
  public containerClass: string = styles.container;
  public rowClass: string = `ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`;
  public buttonClass: string = `ms-Button ${styles.button}`;

  constructor(bindings: IKoWebPartBindingContext) {
    this.description(bindings.description);
    this.userName(bindings.userName);
    this.license(bindings.license);
    this.groups(bindings.groups);

    // When web part description is updated, change this view model's description.
    bindings.shouter.subscribe((value: string) => {
      this.description(value);
    }, this, 'description');
  }
}
