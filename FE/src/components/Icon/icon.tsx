import { AiOutlineHeart, AiOutlineShoppingCart, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
type Props = {
  name: string;
  className?: string;
};
const Icon = ({ name, className }: Props) => {
  let IconComponent: any = null;
  switch (name) {
    case "BsHeart":
      IconComponent = BsHeart;
      break;
    case "FaRegEye":
      IconComponent = FaRegEye;
      break;
    case "RiDeleteBin6Line":
      IconComponent = RiDeleteBin6Line;
      break;
    case "AiOutlineShoppingCart":
      IconComponent = AiOutlineShoppingCart;
      break;
    case "AiFillEdit":
      IconComponent = AiFillEdit;
      break;
    case "AiOutlinePlus":
      IconComponent = AiOutlinePlus;
      break;
    default:
      return null;
  }
  return <IconComponent className={className} />;
};

export default Icon;
