import { Badge } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignCatControlButtons() {
  return (
    <div className="float-end">
      <Badge className="bg-secondary text-black border border-black">25% of Total</Badge>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}