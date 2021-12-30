import React from 'react';
import { Row, Col, Button, Popconfirm, Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import utilsCss from '../consys/utils.css';
import http from '../consys/http';
import auth from '../consys/auth';
import SearchDetalhes from './SearchDetalhes';
import EditButton from '../consys/EditButton';

function SearchItem({ index, data, callback }) {
  const handleDelete = () => {
    http('/doenca', {
      method: 'DELETE',
      params: { codigo: data.codigo }
    }).then(() => {
      callback && callback();
      message.success('Deletada com sucesso.')
    }).catch(err => {
      Modal.error({
        title: 'Erro ao deletar',
        content: err.message
      });
    });
  }

  return (
    <Row type='flex'
      align='middle'
      justify='space-between'
      className={[utilsCss.px2, utilsCss.py3, index > 0 ? utilsCss.borderTop : null].join(' ')}>
      <Col>
        <SearchDetalhes codigo={data.codigo}
          callback={() => callback && callback()}>
          <span><h2><a>{data.Search}</a></h2></span>
        </SearchDetalhes>
        <b>Gravidade: </b>
        {data.gravidade == 'L' ? "Leve"
          : data.gravidade == 'G' ? "Grave"
            : "Médio"} <br />
        {data.descricao ? <span><b>Descrição: </b> {data.descricao}</span> : ''}
      </Col>
      <Col>
        <SearchDetalhes codigo={data.codigo}
          callback={() => callback && callback()}>
          <EditButton className={utilsCss.mr1} />
        </SearchDetalhes>
        {auth.user.admin ?
          <Popconfirm placement="top"
            okText="Sim"
            onConfirm={handleDelete}
            title="Deseja Remover a Doença?"
            cancelText="Não">
            <Button type='danger'
              icon={<DeleteOutlined />} />
          </Popconfirm>
          : null}
      </Col>
    </Row>
  );
}

SearchItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  callback: PropTypes.func
}

export default SearchItem;