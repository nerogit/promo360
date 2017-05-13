/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import 'aframe';
import 'aframe-mouse-cursor-component';
import carImage from '../../public/car.jpg';

class HomePage extends React.Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  state = {
    modal: false,
  };

  componentDidMount() {
    document.title = title;
    for(let target of document.querySelectorAll('.colider')) {
      target.addEventListener('click', (e) => {
        if (!e.detail.cursorEl)
          this.setState({ modal: true, modalId: e.target.id, });
      });
      target.addEventListener('mouseenter', (e) => {
        if (e.detail.cursorEl)
          e.target.setAttribute('material', 'color', 'orange');
      });
      target.addEventListener('mouseleave', (e) => {
        if (e.detail.cursorEl)
          e.target.setAttribute('material', 'color', 'skyblue')
      });
    }
  }

  render() {
    const { modal, modalId } = this.state;
    const modalData = {
      navi: {
        title: "네비게이션",
      },
      gearbox: {
        title: "기어박스",
      },
      sterring: {
        title: "핸들",
      },
      seat: {
        title: "시트",
      }
    };
    return (
      <Layout className={s.content}>
        {
          modal ?
            <div className={s.modalBackdrop}>
              <div className={s.modal}>
                {modalData[modalId].title}
                <button onClick={()=>this.setState({ modal: false })}>닫기</button>
              </div>
            </div> : null
        }
        <a-scene embedded vr-mode-ui="enabled: false">
          <a-box position="6 1 -8" rotation="30 30 0" color="skyblue" id="navi" class="colider">
            <a-animation attribute="rotation" dur="2000" fill="backwards" repeat="indefinite" to="30 30 360"></a-animation>
          </a-box>

          <a-box position="6 -14 -8" rotation="30 30 0" color="skyblue" id="gearbox" class="colider">
            <a-animation attribute="rotation" dur="2000" fill="backwards" repeat="indefinite" to="30 30 360"></a-animation>
          </a-box>

          <a-box position="20 -1 0" rotation="30 30 0" color="skyblue" id="sterring" class="colider">
            <a-animation attribute="rotation" dur="2000" fill="backwards" repeat="indefinite" to="30 30 360"></a-animation>
          </a-box>

          <a-box position="-10 3 5" rotation="30 30 0" color="skyblue" id="seat" class="colider">
            <a-animation attribute="rotation" dur="2000" fill="backwards" repeat="indefinite" to="30 30 360"></a-animation>
          </a-box>

          <a-entity position="0 1.8 4">
            <a-entity camera look-controls mouse-cursor>
              <a-cursor fuse="false" material="color: yellow; opacity: 0.2"></a-cursor>
            </a-entity>
          </a-entity>

          <a-sky src={"../car.jpg"} rotation="0 -130 0"></a-sky>
        </a-scene>

        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <p>
          <br /><br />
        </p>
      </Layout>
    );
  }

}

export default HomePage;
