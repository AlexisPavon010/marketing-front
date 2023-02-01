import { Menu, Avatar, Badge, Space, MenuProps, Col } from 'antd'
import { AiOutlineForm, AiOutlineQuestionCircle, AiOutlineTable } from 'react-icons/ai';
import { BiBox, BiCodeBlock, BiHomeAlt, BiLeftArrowAlt, BiStore } from 'react-icons/bi'
import { IoIosSettings } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';

interface SideMenuProps {
  closeMenu?: () => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const { SubMenu } = Menu;

export const SideMenu = ({ closeMenu }: SideMenuProps) => {

  const navigate = useNavigate()

  const handleNavigate = (href: string) => {
    navigate(href)
  }

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
    { label: 'Preguntas', icon: <AiOutlineQuestionCircle size={20} />, key: '/dashboard/questions' },
    { label: 'Table', icon: <AiOutlineTable size={20} />, key: '/dashboard/table' },
    { label: 'Users', icon: <AiOutlineTable size={20} />, key: '/dashboard/users' },
    {
      key: "grp",
      icon: null,
      children: [
        {
          "key": "/dashboard/categories/branding",
          "label": "Branding"
        },
        {
          "key": "/dashboard/categories/creación-de-contenido",
          "label": "Creación de Contenido"
        },
        {
          "key": "/dashboard/categories/marketing-promocional",
          "label": "Marketing Promocional"
        },
        {
          "key": "/dashboard/categories/performance-marketing",
          "label": "Performance Marketing"
        },
        {
          "key": "/dashboard/categories/estrategia-de-crecimiento",
          "label": "Estrategia de Crecimiento"
        },
        {
          "key": "/dashboard/categories/impacto-positivo",
          "label": "Impacto Positivo"
        },
      ],
      label: "Categoríes",
      type: "group",
    }
  ]

  return (
    <Menu
      onClick={() => { }}
      style={{ width: 250 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {pages.map((p) => (
        p.children ? (
          <SubMenu
            key={p.key}
            icon={p.icon}
            title={p.label}
          >
            {p.children.map((c) => (
              <Menu.Item
                key={c.key}
                onClick={closeMenu}
              >
                <Link to={c.key}>
                  {c.label}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
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
        )))}
    </Menu >

  )
}
