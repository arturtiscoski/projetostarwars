import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import { ReconciliationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { urlSearch } from "../search/Search";
import utilsCss from '../consys/utils.css';
import menuCss from './menu.css';

const MenuItem = Menu.Item;

function _Menu() {
  const [current, setCurrent] = useState('acompanhamento');
  const iconProps = {
    style: {
      fontSize: 16,
      color: '#00adb8',
      paddingRight: '5px'
    }
  }

  return (
    <Row className={menuCss.menuBackground}>
      <Col span={24}>
        <Row type="flex"
          justify="space-between"
          align="middle">
          <Col xs={24}>
            <Menu selectedKeys={[current]}
              mode="horizontal"
              className={utilsCss.center}
              onClick={(e) => setCurrent(e.key)}
              style={{ backgroundColor: '#FFF', color: '#000' }}>
              <MenuItem key='1'>
                <Link to={urlSearch} />
                <ReconciliationOutlined {...iconProps} />
                Informações
              </MenuItem>
            </Menu>
          </Col>
        </Row>
      </Col>
    </Row >
  );
}

export default _Menu;