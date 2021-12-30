import React, { useState, useEffect } from 'react';
import { Row, Card, Col, Input, notification } from 'antd';
import http from '../consys/http';
import Screen from '../consys/Screen';
import CardItem from '../consys/CardItem';
import documentTitle from '../consys/documentTitle';
import searchCss from './search.css';
import SearchItem from './SearchItem';

const urlSearch = '/painel/search';

function Search() {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    documentTitle.set("Doenças");
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      fetch({ filtro });
    }, 300);

    return () => { clearTimeout(timeout); }
  }, [filtro]);

  const fetch = (params = { filtro: '' }) => {
    setLoading(true)
    http('/search/list', {
      method: 'GET',
      params
    }).then((result) => {
      setData(result);
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
                onChange={({ target: { value } }) => setFiltro(value)} />
            </Col>
          </Col>
        </Row>
      </Card>
      <Card className={searchCss.card}
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
    </Screen>
  );
}

export default Search;
export { urlSearch }