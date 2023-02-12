import { Menu, MenuProps } from 'antd'
import { AiOutlineForm, AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { IoIosSettings } from 'react-icons/io'
import { Link } from 'react-router-dom';

interface SideMenuProps {
  closeMenu?: () => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const { SubMenu } = Menu;

export const SideMenu = ({ closeMenu }: SideMenuProps) => {

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }


  const items: MenuProps['items'] = [
    getItem('Formulario', 'g15', <IoIosSettings />,
      [
        getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
      ]
    ),

    getItem('Navigation One', 'sub1', <IoIosSettings />,
      [
        getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
      ]),

    getItem('Navigation Two', 'sub2', <IoIosSettings />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    { type: 'divider' },

    getItem('Navigation Three', 'sub4', <IoIosSettings />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),

    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
  ];


  const pages = [
    { label: 'Dashboard', icon: <AiOutlineForm size={20} />, key: '/dashboard' },
    // { label: 'Questionarios', icon: <AiOutlineQuestionCircle size={20} />, key: '/dashboard/questions' },
    { label: 'Usuarios', icon: <AiOutlineUser size={20} />, key: '/dashboard/users' },

  ]

  return (
    <Menu
      style={{ width: 250 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {pages.map((p) => (
        <Menu.Item
          key={p.key}
          icon={p.icon}
          title={p.label}
          onClick={closeMenu}
        >
          <Link to={p.key}>
            {p.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu >
  )
}
