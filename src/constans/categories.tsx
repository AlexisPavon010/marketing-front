import { AiOutlinePlusSquare } from "react-icons/ai";
import { BiChart } from "react-icons/bi";
import { FiDatabase } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineBubbleChart, MdOutlineDraw, MdOutlineShowChart } from "react-icons/md";

export const CATEGORIES = [
  {
    id: 'branding',
    name: 'Branding / Desarrollo de Valor de Marca',
    icon: <MdOutlineDraw size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
  {
    id: 'estrategia-de-crecimiento',
    name: 'Estrategia de Crecimiento',
    icon: <MdOutlineShowChart size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
  {
    id: 'performance-marketing',
    name: 'Performance Marketing',
    icon: <BiChart size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)',
  },
  {
    id: 'marketing-promocional',
    name: 'Marketing Promocional',
    icon: <MdOutlineBubbleChart size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
  {
    id: 'creacion-de-contenido',
    name: 'Uso de Influencers / C. de Contenido',
    icon: <HiOutlinePencilSquare size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
  // {
  //   id: 'impacto-positivo',
  //   name: 'Impacto Positivo',
  //   icon: <AiOutlinePlusSquare size={32} />,
  //   color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  // },
  // {
  //   id: 'uso-de-first-party-data',
  //   name: 'Uso de First Party Data',
  //   icon: <FiDatabase size={32} />,
  //   color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  // },
]