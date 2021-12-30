import React, { useState, useCallback } from 'react';
import { Row, Modal, Form, Input, Col, Table, Radio } from 'antd';
import PropTypes from 'prop-types';
import Loading from '../consys/Loading';
import searchCss from './search.css';
import utilsCss from '../consys/utils.css'
import swapi from 'swapi-wrapper';
import http from '../consys/http';

const FormItem = Form.Item;

function SearchDetalhes({ data, children }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [filmes, setFilmes] = useState(false);
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Título',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Data de lançamento',
      key: 'release_date',
      dataIndex: 'release_date',
    }
  ]

  const modal = async visible => {
    setVisible(visible)

    if (visible && data) {
      setLoading(true);
      let films = []
      console.log('data', data);

      for (let i = 0; i < data.films.length; i++) {
        const film = data.films[i];
        await http(film, {
          method: 'GET',
          api: false
        }).then((result) => {
          films.push(result)
        });
      }

      setLoading(false);
      form.setFieldsValue(data);
      setFilmes(films)
    }
  }

  const onClose = useCallback(() => {
    setVisible(false);
    setLoading(false);
    setLoadButton(false);
    form.resetFields();
  })

  return (
    <span>
      <span onClick={() => modal(true)}>
        {children}
      </span>
      <Modal visible={visible}
        title='Detalhes'
        onCancel={onClose}
        onOk={onClose}
        width={'75%'}>
        <Loading spinning={loading}>
          <Form className={searchCss.formItem}
            form={form}
            initialValues={{ gravidade: 'L', descricao: '' }}
            layout='vertical'>
            <Row type='flex'
              gutter={12}
              className={utilsCss.mb1}>
              <Col lg={6}
                xs={24}>
                <FormItem label='Nome'
                  name='name'>
                  <Input />
                </FormItem>
              </Col>
              <Col lg={4}>
                <FormItem label='Ano de aniversário'
                  name='birth_year'>
                  <Input />
                </FormItem>
              </Col>
              <Col lg={8}>
                <FormItem label='Gênero'
                  name='gender'>
                  <Radio.Group>
                    <Radio.Button value='male'>
                      Male  
                    </Radio.Button>
                    <Radio.Button value='female'>
                      Female
                    </Radio.Button>
                    <Radio.Button value='unknown'>
                      unknown
                    </Radio.Button>
                    <Radio.Button value='n/a'>
                      n/a
                    </Radio.Button>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col lg={4}>
                <FormItem label='Cor dos olhos'
                  name='eye_color'>
                  <Input />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label='Filmes'>
                  <Table dataSource={filmes}
                    bordered
                    columns={columns}
                    size='small'
                    rowKey={(record) => record.title}/>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Loading>
      </Modal>
    </span>
  );
}

SearchDetalhes.propTypes = {
  callback: PropTypes.func,
  codigo: PropTypes.number,
  children: PropTypes.node,
}

export default SearchDetalhes;