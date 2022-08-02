import React, { useEffect, useState } from 'react';
import { BaseStyled } from './styled';
import { BuildOutlined, BookOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ICollection } from '../../types/ICollection';
import { FETCH_COLLECTIONS } from '../../redux/collection/collection.saga';
import { COLORS } from '../../constants/colors';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../redux/auth/auth.saga';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const genMenu = (collections: ICollection[]): MenuItem[] => [
  getItem(
    'Collection Types',
    'collectionTypes',
    <BookOutlined />,
    collections.map((c, ind) => getItem(c.collectionName, c.collectionName || ind.toString())),
  ),
  getItem('Content Type Builder', 'contentTypeBuilder', <BuildOutlined />),
  getItem('Profile', 'userProfile', <UserOutlined />),
  getItem('Logout', 'logout', <LogoutOutlined />),
];

const Base: React.FC<{ headerTitle?: string, defaultSelectedKey?: string, children: React.ReactNode }> = ({ headerTitle, defaultSelectedKey, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const collections = useSelector<{ collection: ICollection[] }, ICollection[]>(
    (state) => state.collection,
  );
  const navigate = useNavigate();

  const handleTabNavClick = (e: any) => {
    if(e.key === 'contentTypeBuilder') {
      navigate('/content-type');
    } else if(e.key === 'userProfile') {
      navigate('/user');
    } else if(e.key === 'logout') {
      dispatch(LOGOUT());
    } else {
      navigate(`/collection-type/${e.key}`);
    }
  }

  // Fetch Collections
  useEffect(() => {
    dispatch(FETCH_COLLECTIONS());
  }, []);

  return (
    <BaseStyled>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Header
            className="site-layout-background font-black text-white text-xl flex justify-center items-center"
            style={{ padding: 0, background: COLORS.strongPurple }}
          >
            CMS+
          </Header>
          <Menu
            onClick={handleTabNavClick}
            theme="dark"
            defaultSelectedKeys={[defaultSelectedKey || '1']}
            defaultOpenKeys={['collectionTypes']}
            mode="inline"
            items={genMenu(collections)}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background font-black text-white text-xl flex items-center"
            style={{ padding: 0, background: COLORS.white, color: COLORS.blackText, paddingLeft: 32 }}
          >
            {headerTitle || ''}
          </Header>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    </BaseStyled>
  );
};

export default Base;
