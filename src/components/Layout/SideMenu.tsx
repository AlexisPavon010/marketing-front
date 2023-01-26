import { Menu, Avatar, Badge, Space, MenuProps, Col } from 'antd'
import { AiOutlineForm, AiOutlineQuestionCircle, AiOutlineTable } from 'react-icons/ai';
import { BiBox, BiCodeBlock, BiHomeAlt, BiLeftArrowAlt, BiStore } from 'react-icons/bi'
import { IoIosSettings } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';

interface SideMenuProps {
  closeMenu?: () => void;
}

type MenuItem = Required<MenuProps>['items'][number];

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
    { label: 'Formulario', icon: <AiOutlineForm size={20} />, key: '/', onClick: () => handleNavigate('/') },
    { label: 'Preguntas', icon: <AiOutlineQuestionCircle size={20} />, key: '/questions', onClick: () => handleNavigate('/questions') },
    { label: 'Tabla', icon: <AiOutlineTable size={20} />, key: '/table', onClick: () => handleNavigate('/table') },

    {
      key: "grp",
      icon: null,
      children: [
        {
          "key": "branding",
          "label": "Branding"
        },
        {
          "key": "creación-de-contenido",
          "label": "Creación de Contenido"
        },
        {
          "key": "marketing-promocional",
          "label": "Marketing Promocional"
        },
        {
          "key": "performance-marketing",
          "label": "Performance Marketing"
        },
        {
          "key": "estrategia-de-crecimiento",
          "label": "Estrategia de Crecimiento"
        },
        {
          "key": "impacto-positivo",
          "label": "Impacto Positivo"
        },
      ],
      label: "Categoríes",
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
      items={pages}
    />

  )
}
