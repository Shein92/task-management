import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  changeTaskDescription,
  changeTaskTitle,
  deleteTaskById,
} from "../../app/thunk/tasks";
import EditableTitle from "../EditableTitle";
import {
  PopupWrapper,
  Popup,
  TopWrapper,
  DescriptionTextWrapper,
} from "./style";
import { ISelectedTask } from "../../app/redux/tasks/types";
import { setSelectedTask } from "../../app/redux/tasks/actions";

interface ITaskPopup {
  task: ISelectedTask;
}

const TaskPopup: FC<ITaskPopup> = ({ task }) => {
  const dispatch = useDispatch();

  const [changeMode, setChangeMode] = useState(false);
  const [text, setText] = useState("");

  const changeDescriptionHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.currentTarget.value);
    },
    []
  );

  const closePopupHandler = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      dispatch(setSelectedTask(null, null));
    },
    [dispatch]
  );

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      if (title === task.title) {
        return;
      }
      dispatch(changeTaskTitle(task.columnId!, task.id, title));
    },
    [dispatch, task.columnId, task.id, task.title]
  );

  const deleteTask = useCallback(() => {
    dispatch(deleteTaskById(task.columnId!, task.id));
  }, [dispatch, task.columnId, task.id]);

  const setTaskDescription = useCallback(() => {
    if (text.length === 0) {
      return;
    }
    setChangeMode(false);
    if (task.columnId) {
      dispatch(changeTaskDescription(task.columnId, task.id, text));
    }
  }, [dispatch, task.columnId, task.id, text]);

  useEffect(() => {
    if (task.description !== null) {
      setText(task.description);
    }
  }, []);

  const renderDescriptionComponent = () => {
    if (!task.description) {
      return (
        <div>
          <TextField
            value={text}
            onChange={changeDescriptionHandler}
            autoFocus
            multiline={true}
            fullWidth={true}
          />
          <Button
            color="primary"
            startIcon={<SaveIcon />}
            variant="outlined"
            onClick={setTaskDescription}
          >
            Add description
          </Button>
        </div>
      );
    }

    if (!changeMode) {
      return (
        <div>
          {task.description}
          <div>
            <IconButton
              color="primary"
              onClick={() => {
                setChangeMode(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        </div>
      );
    }

    if (changeMode) {
      return (
        <div>
          <TextField
            value={text}
            onChange={changeDescriptionHandler}
            autoFocus
            // onBlur={activateViewMode}
            multiline={true}
            fullWidth={true}
          />
          <div
            style={{
              display: "flex",
            }}
          >
            <IconButton color="primary" onClick={setTaskDescription}>
              <SaveIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                setChangeMode(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      );
    }
  };

  return (
    <PopupWrapper>
      <Popup>
        <TopWrapper>
          <EditableTitle
            value={task.title}
            onChange={changeTaskTitleHandler}
            deleteItem={deleteTask}
            isColumnTitle={true}
          />
          <IconButton color="primary" onClick={closePopupHandler}>
            <CloseIcon />
          </IconButton>
        </TopWrapper>
        <div>
          <DescriptionTextWrapper>Description:</DescriptionTextWrapper>
          <div>{renderDescriptionComponent()}</div>
        </div>
      </Popup>
    </PopupWrapper>
  );
};

export default TaskPopup;
