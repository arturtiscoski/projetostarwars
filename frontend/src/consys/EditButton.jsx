import React, { Component } from 'react';
import {Button, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import { EyeOutlined } from '@ant-design/icons';

class EditButton extends Component {
  render() {
    const {className, onEdit} = this.props;
    return (
      <Tooltip title={"Editar"}>
        <Button icon={<EyeOutlined/>}
          onClick={onEdit ? onEdit : null}
          className={className}/>
      </Tooltip>
    );
  }
}

EditButton.propTypes = {
  className: PropTypes.node,
  onEdit: PropTypes.func,
  flat: PropTypes.bool,
  noLink: PropTypes.bool,
  view: PropTypes.bool
};

export default EditButton;