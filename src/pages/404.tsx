import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';
const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={'Sorry, the page you are visiting does not exist.'}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {'back home'}
      </Button>
    }
  />
);
export default NoFoundPage;
