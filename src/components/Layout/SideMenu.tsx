import { Menu, Avatar, Badge, Space, MenuProps, Col } from 'antd'
import { BiBox, BiCodeBlock, BiHomeAlt, BiLeftArrowAlt, BiStore } from 'react-icons/bi'
import { IoIosSettings } from 'react-icons/io'
import { Link } from 'react-router-dom';


const { SubMenu } = Menu;

interface SideMenuProps {
  closeMenu?: () => void;
}

type MenuItem = Required<MenuProps>['items'][number];

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
    { label: 'HOME', icon: <BiHomeAlt size={20} />, key: '/' },
    // { title: 'STORES', icon: <BiStore size={20} />, href: '/accounts' },
    {
      key: "grp",
      icon: null,
      children: [
        {
          "key": "13",
          "label": "Option 13"
        },
        {
          "key": "14",
          "label": "Option 14"
        }
      ],
      label: "Group",
      type: "group"
    }
  ]

  return (
    <Menu
      onClick={() => { }}
      style={{ width: 250 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  )
}
