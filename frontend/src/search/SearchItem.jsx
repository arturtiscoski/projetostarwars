import React from 'react';
import { Row, Col, Tag } from 'antd';
import PropTypes from "prop-types";
import utilsCss from '../consys/utils.css';
import SearchDetalhes from './SearchDetalhes';
import EditButton from '../consys/EditButton';

function SearchItem({ index, data, callback }) {
  return (
    <Row type='flex'
      align='middle'
      justify='space-between'
      className={[utilsCss.px2, utilsCss.py3, index > 0 ? utilsCss.borderTop : null].join(' ')}>
      <Col lg={23}>
        <SearchDetalhes data={data}>
          <span><h2><a>{data.name}</a></h2></span>
        </SearchDetalhes>
        <br/>
        <b>Ano de aniversário: </b>
        {data.birth_year}
        &nbsp;&nbsp;&nbsp;
        <b>Gênero: </b>
        &nbsp;
        <Tag color='blue'
          style={{borderRadius: 5}}>
          {data.gender}
        </Tag>
      </Col>
      <Col lg={1}
        md={0}
        xs={0}>
        <SearchDetalhes data={data}>
          <EditButton className={utilsCss.mr1} />
        </SearchDetalhes>
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