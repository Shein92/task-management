import React, { ChangeEvent, FC, useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';


import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { validator } from "../../util/regExpValidation";
import { BtnWrapper } from "./style";

interface IAddItem {
  addItem: (title: string) => void;
}

const AddItem: FC<IAddItem> = ({ addItem }) => {
  const [isAddItemActive, setIsAddItemActive] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!validator(event.currentTarget.value)) {
        setTitle(event.currentTarget.value);
        setError(true);
        return;
      }
      setError(false);
      setTitle(event.currentTarget.value);
    },
    []
  );

  const setActiveAddItemHandler = useCallback(() => {
    setIsAddItemActive((prevState) => !prevState);
  }, []);

  const addItemHandler = useCallback(() => {
    if (error) {
      return;
    }
    addItem(title);
    setTitle('');
    setActiveAddItemHandler();
  }, [addItem, error, setActiveAddItemHandler, title]);

  return (
    <div>
      {isAddItemActive ? (
        <div>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={title}
            onChange={onChangeHandler}
            margin="normal"
          />
          <BtnWrapper>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={addItemHandler}
            >
              Add
            </Button>
            <IconButton color="secondary" onClick={setActiveAddItemHandler}>
              <CloseIcon />
            </IconButton>
          </BtnWrapper>
        </div>
      ) : (
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={setActiveAddItemHandler}
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default AddItem;
