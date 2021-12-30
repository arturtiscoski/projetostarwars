import React, { useState, useEffect } from 'react';
import { Row, Card, Col, Input, notification, Pagination } from 'antd';
import http from '../consys/http';
import Screen from '../consys/Screen';
import CardItem from '../consys/CardItem';
import documentTitle from '../consys/documentTitle';
import searchCss from './search.css';
import utilsCss from "../consys/utils.css";
import SearchItem from './SearchItem';

const urlSearch = '/painel/search';

function Search() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    documentTitle.set("Star wars");
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      fetch({ search });
    }, 300);

    return () => { clearTimeout(timeout); }
  }, [search]);

  const fetch = (params = { page: 1 }) => {
    console.log('params', params);
    if (!params.search) {
      params = {...params, search}
    }
    console.log('params depoix', params);
    setLoading(true)
    http('https://swapi.dev/api/people/', {
      method: 'GET',
      params,
      api: false
    }).then((result) => {
      console.log('result', result);
      setData(result.results);
      setTotal(result.count);
      setLoading(false);
    }).catch((err) => {
      notification.error({
        message: 'Erro',
        description: err.message,
      });
      setLoading(false);
    });
  }

  return (
    <Screen>
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[0, 10]}
          justify='space-between'
          align='middle'>
          <Col lg={10}
            md={15}
            xs={24}>
            <Col md={20}
              xs={24}>
              <Input placeholder='Filtrar...'
                onChange={({ target: { value } }) => setSearch(value)} />
            </Col>
          </Col>
        </Row>
      </Card>
      <Card className={[searchCss.card, utilsCss.mb1].join(' ')}
        loading={loading}>
        <CardItem data={data}>
          {data.map((item, index) => (
            <SearchItem key={index}
              index={index}
              data={item}
              callback={() => fetch()} />
          ))}
        </CardItem>
      </Card>
      <Row wrap={false}
        justify='end'>
        <Col flex='none'>
          <Pagination defaultCurrent={1}
            total={total}
            showSizeChanger={false}
            disabled={loading}
            onChange={(page) => fetch({page})}/>
        </Col> 
      </Row>
    </Screen>
  );
}

export default Search;
export { urlSearch }