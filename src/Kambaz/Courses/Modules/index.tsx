// import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
// import * as db from "../../Database";
import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { FormControl } from "react-bootstrap";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");

  return (
    <div>
      <ModulesControls moduleName={moduleName} setModuleName={setModuleName} addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}/><br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.filter(module => module.course === cid).map(module => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray" key={module._id}>
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              { module.editing && (
                <FormControl className="w-50 d-inline-block"
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}/>
              )}
              <ModuleControlButtons moduleId={module._id} deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }} editModule={(moduleId) => dispatch(editModule(moduleId))} />
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map(lesson => (
                  <li className="wd-lesson list-group-item p-3 ps-1" key={lesson._id}>
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {/*
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 1
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 2
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 1
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 2
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 3
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 3
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 4
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 5
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
      */}
    </div>
);}
