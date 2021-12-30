import React from 'react';
import {notification} from 'antd';
import http from './http';
import PropTypes from 'prop-types';

let dataUtils = (Component) => {
  const name = Component.displayName || Component.name || Component.constructor.displayName || Component.constructor.name;

  class DataUtilsComponent extends Component {
    constructor() {
      super();
      this.close = this.close.bind(this);
      this.del = this.del.bind(this);
    }
    del(index, config){
      const {state} = this.wrappedInstance;
      const {data} = state;
      if (typeof data === 'undefined')
      {
        return;
      }
      if (typeof config === 'undefined')
      {
        data.splice(index, 1);
        this.setState({data});
        return;
      }
      const {
        url, 
        params,
        body,
        onFinish,
        method
      } = config;

      http(url, {
        method: method || 'DELETE',
        params: params,
        body
      }).then(() => {
        data.splice(index, 1);
        this.setState({data});
        onFinish && onFinish()
      }).catch(({message}) => {
        if (message)
        {
          notification.error({
            message: 'Erro!',
            description: message
          });
        }
      });
    }
    close(res, index){
      const {state} = this.wrappedInstance;
      const {data} = state;
      if (typeof data === 'undefined')
      {
        return;
      }
      if (res){
        if (typeof index !== 'undefined' && index !== null){
          data[index] = res;
        }
        else {
          data.unshift(res);
        }
        this.setState({data});
      }
    }   
    componentDidMount(){
      const {form} = this.props;
      const {state} = this.wrappedInstance;
      if (state) {
        const {values} = state;
        if (values) {
          if (typeof form == 'undefined')
          {
            throw 'componente sem o HOC Form.create()';
          }
          else
          {
            form.setFieldsValue(values);     
          }
        }
      }
    }
    ref(wrappedInstance) {
      this.wrappedInstance = wrappedInstance;
    }
    render() {
      const dataUtilsProps = {
        dataUtils: {
          close: this.close,
          del: this.del
        }
      }
      return <Component {...this.props} 
                {...dataUtilsProps} 
                ref={this.ref.bind(this)} />
    }
  }
  DataUtilsComponent.displayName = name;
  return DataUtilsComponent;
};

dataUtils.propTypes = {
  form: PropTypes.object
};

export default dataUtils;