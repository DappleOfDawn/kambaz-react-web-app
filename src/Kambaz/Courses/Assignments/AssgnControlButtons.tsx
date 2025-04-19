import { IoEllipsisVertical, IoTrash } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function AssgnControlButtons({ assignmentId, deleteAssignment }: { assignmentId: string, deleteAssignment: (assignmentId: string) => Promise<void> }) {
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
            <Button variant="danger" onClick={async () => {
              await deleteAssignment(assignmentId);
              setShowDelete(false);
            }}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>
);}