import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import utilsCss from '../consys/utils.css';
import classNames from 'classnames';
import menuCss from './menu.css';

class MenuItem extends Component {
  render() {
    const { active, children, url, location } = this.props;
    const comp = (
      <Row className={classNames({
        [utilsCss.center]: true,
        [utilsCss.py2]: true,
        [utilsCss.h4]: true
      })}>
        <Row className={utilsCss.h2}>
          {icon}
        </Row>
        <Row>
          {children}
        </Row>
      </Row>
    );

    return (
      <Row className={classNames({
        [menuCss.ativo]: location.pathname == url || (active && active(location.pathname))
      })}>
        {url ?
          <Link to={url}
            style={{ textDecoration: 'none' }}>
            {comp}
          </Link>
          :
          <a onClick={this.props.onClick}>
            {comp}
          </a>
        }
      </Row>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.node,
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.func,
}

const MenuItemRouter = withRouter(MenuItem);
export default MenuItemRouter;
