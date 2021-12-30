import React, { useState, useCallback } from 'react';
import { Row, Modal, Form, Input, Col, Select, notification, message } from 'antd';
import PropTypes from 'prop-types';
import Loading from '../consys/Loading';
import http from '../consys/http';
import searchCss from './search.css';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

function SearchDetalhes({ callback, codigo, children }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [form] = Form.useForm();

  const modal = visible => {
    if (visible && codigo) {
      setLoading(true);

      http('/doenca/detalhes', {
        method: 'GET',
        params: { codigo }
      }).then((result) => {
        form.setFieldsValue(result);
        setLoading(false);
      }).catch((err) => {
        notification.error({
          message: 'Erro',
          description: err.message,
        });
        setLoading(false);
      });
    }

    setVisible(visible)
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
        onOk={form.submit}
        confirmLoading={loadButton}
        okText='Salvar'
        width={660}>
        <Loading spinning={loading}>
          <Form className={searchCss.formItem}
            form={form}
            initialValues={{ gravidade: 'L', descricao: '' }}
            layout='vertical'>
            <Row type='flex'
              gutter={12}>
              <Col md={19}
                xs={24}>
                <FormItem label='Skywars'
                  name='doenca'
                  rules={[{ required: true, message: 'A doença é obrigatória' }]}>
                  <Input />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label='Descrição da doença'
                  name='descricao'>
                  <TextArea placeholder='Cuidados a se tomar, tratamento e etc...'
                    autoSize={{ minRows: 5, maxRows: 5 }} />
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