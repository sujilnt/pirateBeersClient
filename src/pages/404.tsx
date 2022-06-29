import { getLink } from '@/components/Navbar';
import {  Result } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={getLink("/", "Home")}
  />
);

export default App;
