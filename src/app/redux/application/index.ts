const SET_APPLICATION_LOADER = "app/SET_APPLICATION_LOADER";

interface IApplicationState {
  isLoading: boolean;
}

const initialState: IApplicationState = {
  isLoading: false,
};

export const applicationReducer = (
  state: IApplicationState = initialState,
  action: ActionsType
): IApplicationState => {
  switch (action.type) {
    case SET_APPLICATION_LOADER: {
      return {...state, isLoading: action.state}
    }
    default: {
      return state;
    }
  }
};

export type ActionsType = ReturnType<typeof setApplicationLoader>;

export const setApplicationLoader = (state: boolean) => {
  return { type: SET_APPLICATION_LOADER, state } as const;
};
