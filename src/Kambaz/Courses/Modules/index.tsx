import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { Module } from "../../types";
import { useSelector } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleName, setModuleName] = useState<string>("");

  const addModuleHandler = async () => {
    const newModule = await coursesClient.createModuleForCourse(cid!, {
      name: moduleName,
      course: cid,
    });
    setModules([...modules, newModule]);
    setModuleName("");
  };
  const deleteModuleHandler = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    setModules(modules.filter((module: Module) => module._id !== moduleId));
  };
  const updateModuleHandler = async (module: Module) => {
    const updatedModule = await modulesClient.updateModule(module);
    setModules(modules.map((module: Module) => {
      if (module._id === updatedModule._id) return updatedModule;
      return module;
    }));
  }; 
  const editModule = (moduleId: string) => {
    setModules(modules.map((m: Module) =>
      m._id === moduleId ? { ...m, editing: m.editing ? false : true } : m
    ));
  };

  useEffect(() => {
    const fetchModulesForCourse = async () => {
      const modulesForCourse = await coursesClient.findModulesForCourse(cid!);
      setModules(modulesForCourse);
    };

    fetchModulesForCourse();
  }, [cid]);

  return (
    <div>
      {currentUser.role === "FACULTY" && <div><ModulesControls moduleName={moduleName} setModuleName={setModuleName} addModule={addModuleHandler}/>
      <br /><br /><br /><br /></div>}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: Module) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray" key={module._id}>
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              { module.editing && (
                <FormControl className="w-50 d-inline-block"
                      onChange={(e) => updateModuleHandler({ ...module, name: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateModuleHandler({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}/>
              )}
              {currentUser.role === "FACULTY" &&
                <ModuleControlButtons
                  moduleId={module._id!}
                  deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                  editModule={(moduleId) => editModule(moduleId)}/>
              }
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1" key={lesson._id}>
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
);}
