import * as React from 'react';
import styles from './TaxonomyMenu.module.scss';
import { ITaxonomyMenuProps } from './ITaxonomyMenuProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class TaxonomyMenu extends React.Component<ITaxonomyMenuProps, {}> {
  public render(): React.ReactElement<ITaxonomyMenuProps> {
    return (
      <div className={styles.taxonomyMenu}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>#msisgreat Taxonomy Terms</span>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
