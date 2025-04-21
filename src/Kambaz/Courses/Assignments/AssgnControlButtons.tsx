import { IoEllipsisVertical, IoTrash } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AssgnControlButtons({ assignmentId, deleteAssignment }: { assignmentId: string, deleteAssignment: (assignmentId: string) => Promise<void> }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  return (
      <div className="float-end">
        <GreenCheckmark />
        {currentUser.role === "FACULTY" && <div>
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
        </div>}
      </div>
);}