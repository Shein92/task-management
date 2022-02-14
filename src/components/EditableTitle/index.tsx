import React, {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  MouseEvent,
} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TitleWrapper } from "./style";

interface IEditableTitle {
  value: string;
  onChange: (text: string) => void;
  deleteItem: () => void;
  isColumnTitle?: boolean;
  multiline?: boolean;
}

const EditableTitle: FC<IEditableTitle> = ({
  value,
  onChange,
  deleteItem,
  isColumnTitle = false,
  multiline = false,
}) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(value);

  const activateEditMode = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setEditMode(true);
      setTitle(value);
    },
    [value]
  );
  const activateViewMode = useCallback(() => {
    setEditMode(false);
    onChange(title);
  }, [onChange, title]);
  const changeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  }, []);

  const deleteItemHandler = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      deleteItem();
    },
    [deleteItem]
  );

  return editMode ? (
    <TextField
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      multiline={multiline}
    />
  ) : (
    <TitleWrapper isColumnTitle={isColumnTitle}>
      <div>{value}</div>
      <div>
        <IconButton color="primary" onClick={activateEditMode}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={deleteItemHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
    </TitleWrapper>
  );
};

export default EditableTitle;
