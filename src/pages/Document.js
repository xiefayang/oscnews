import React, { Component } from 'react';
import styles from './Document.less';
import source from '../source/document.json';

if (!localStorage.getItem('osc-doc')) {
  localStorage.setItem('osc-doc', JSON.stringify(source));
}

const github = (
  <svg version="1.1" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
const zhHans = (
  <svg className={styles.zhHans} viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" />
    <path fillRule="nonzero" d="M10.5793605,8.25423729 L11.9225399,12.4943503 L16.2103818,12.4943503 L12.7491119,15.0706215 L14.0406305,19.3107344 L10.5793605,16.680791 L7.11809059,19.3107344 L8.46126999,15.0706215 L5,12.4943503 L9.28784191,12.4943503 L10.5793605,8.25423729 Z M21.7380816,6 L21.6864209,7.50282489 L22.9779395,8.03954803 L21.5830994,8.41525425 L21.5314386,9.86440679 L20.7565274,8.62994351 L19.413348,8.95197743 L20.2915807,7.82485876 L19.5683303,6.59039549 L20.859849,7.18079097 L21.7380816,6 Z M26.542531,10.7768362 L25.922602,12.0649718 L26.9041562,13.0847457 L25.5093161,12.8700565 L24.8893871,14.1581921 L24.6827441,12.7090396 L23.287904,12.4943503 L24.5277619,11.8502825 L24.3211189,10.40113 L25.3026731,11.4209039 L26.542531,10.7768362 Z M25.0960301,16.680791 L25.5609768,18.0762712 L26.9558169,18.0762712 L25.8192805,18.9350283 L26.2325665,20.3305085 L25.0960301,19.4717514 L23.9594937,20.3305085 L24.4244404,18.9350283 L23.287904,18.0762712 L24.6827441,18.0762712 L25.0960301,16.680791 Z M21.7380816,21.1892655 L21.6347601,22.6384181 L22.9779395,23.1751412 L21.5830994,23.5508475 L21.4797779,25 L20.7565274,23.7655367 L19.3616873,24.1412429 L20.2915807,23.0141243 L19.5166696,21.779661 L20.859849,22.3163842 L21.7380816,21.1892655 Z" />
  </svg>
);

export default class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
  }
  componentDidMount() {
    const docs = localStorage.getItem('osc-doc');
    if (!docs) {
      localStorage.setItem('osc-doc', JSON.stringify(source));
    }
    this.setState({
      lists: source,
    });
  }
  render() {
    return (
      <div className={styles.warpper}>
        <div className={styles.title}>开发文档</div>
        <ul className={styles.lists}>
          {this.state.lists.map((item, idx) => {
            const urls = [];
            for (const i in item.urls) {
              if (Object.prototype.hasOwnProperty.call(item.urls, i)) {
                let icon = '';
                if (i === 'git') icon = github;
                if (i === 'cn') icon = zhHans;
                urls.push(
                  <a key={i} href={item.urls[i]}>{icon}</a>
                );
              }
            }
            return (
              <li key={idx}>
                <a className={styles.itemHeader} href={item.website}>
                  <div className={styles.logo}>
                    {item.title && <h4><span>{item.title}</span></h4>}
                    {item.logo && <img alt={item.title} src={item.logo} />}
                  </div>
                  <div className={styles.details}>
                    {item.des}
                  </div>
                </a>
                <div className={styles.urls}> {urls} </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Document.typeName = 'document';