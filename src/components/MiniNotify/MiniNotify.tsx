import React from 'react';
import { Dropdown, Button, MenuProps } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import * as Styled from './MiniNotify.syled';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Styled.Item>
        <Styled.ItemIcon>
          <BellOutlined />
        </Styled.ItemIcon>
        <Styled.ItemContent>
          <Styled.ItemTitle>ABC</Styled.ItemTitle>
          <Styled.ItemTime>8 min</Styled.ItemTime>
        </Styled.ItemContent>
      </Styled.Item>
    ),
  },
  {
    key: '2',
    label: (
      <Styled.Item>
        <Styled.ItemIcon>
          <BellOutlined />
        </Styled.ItemIcon>
        <Styled.ItemContent>
          <Styled.ItemTitle>BCD</Styled.ItemTitle>
          <Styled.ItemTime>8 min</Styled.ItemTime>
        </Styled.ItemContent>
      </Styled.Item>
    ),
  },
];

const MiniNotify: React.FC = () => {
  return (
    <div>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        dropdownRender={(menus) => (
          <>
            <Styled.Dropdown>
              <Styled.Head>
                <span><BellOutlined /> Notification</span>
                <Button type='link' size='small'>View All</Button>
              </Styled.Head>
              <Styled.Body>{menus}</Styled.Body>
            </Styled.Dropdown>
          </>
        )}
      >
        <Button icon={<BellOutlined />}></Button>
      </Dropdown>
    </div>
  );
}

export default MiniNotify;
