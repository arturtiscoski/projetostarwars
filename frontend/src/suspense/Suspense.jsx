import React, { Suspense as SuspenseReact, useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import PropTypes from 'prop-types';
import utilsCss from '../consys/utils.css';

function Suspense({ children, fallback }) {
  const [visible, setVisible] = useState(false);
  const minHeight = document.body.clientHeight * (80 / 100);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, [])

  const render = () => {
    return (
      <Row align='middle'
        justify='center'
        style={{ minHeight }}>
        <Col span={24}
          className={[utilsCss.center, utilsCss.h2].join(' ')}>
          {visible &&
            <span>
              Carregando Sistema <br /> <Spin size="large" />
            </span>
          }
        </Col>
      </Row>
    );
  }

  return (
    <SuspenseReact fallback={fallback ? fallback : render()}>
      {children}
    </SuspenseReact>
  );
}

Suspense.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node
};

export default Suspense;