import { AiOutlinePlusSquare } from "react-icons/ai";
import { BiChart } from "react-icons/bi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineBubbleChart, MdOutlineDraw, MdOutlineShowChart } from "react-icons/md";

export const CATEGORIES = [
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
    id: 'estrategia-de-crecimiento',
    name: 'Estrategia de Crecimiento',
    icon: <MdOutlineShowChart size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
  {
    id: 'creacion-de-contenido',
    name: 'Creación de Contenido',
    icon: <HiOutlinePencilSquare size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
  {
    id: 'branding',
    name: 'Branding',
    icon: <MdOutlineDraw size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
  {
    id: 'impacto-positivo',
    name: 'Impacto Positivo',
    icon: <AiOutlinePlusSquare size={32} />,
    color: 'linear-gradient(45deg, rgba(18,122,222,1) 0%, rgba(66,162,255,1) 100%)'
  },
]