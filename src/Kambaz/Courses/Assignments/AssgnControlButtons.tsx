import { IoEllipsisVertical, IoTrash } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function AssgnControlButtons({ assignmentId }: { assignmentId: string }) {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  return (
      <div className="float-end">
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />
        <IoTrash onClick={() => setShowDelete(true)}/>
        <Modal show={showDelete}>
          <Modal.Header closeButton />
          <Modal.Body>Delete this assignment?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDelete(false)}>No</Button>
            <Button variant="danger" onClick={() => {
              dispatch(deleteAssignment(assignmentId));
              setShowDelete(false);
            }}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>
);}