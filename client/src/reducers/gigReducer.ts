export interface NewGig {
  title: string;
  desc: string;
  category: string;
  price: number;
  cover: string;
  images: string[];
  shortTitle: string;
  shortDescription: string;
  deliveryTime: number;
  revision: number;
  features: string[];
}

export enum ActionType {
  CHANGE_INPUT = "CHANGE_INPUT",
  ADD_IMAGES = "ADD_IMAGES",
  ADD_FEATURE = "ADD_FEATURE",
  REMOVE_FEATURE = "REMOVE_FEATURE",
}

export interface Action {
  type: ActionType;
  payload: {
    name?: string;
    value?: string;
    cover?: string;
    images?: string[];
    feature?: string;
  };
}

export const INITIAL_STATE = {
  title: "",
  category: "design",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDescription: "",
  deliveryTime: 0,
  revision: 0,
  features: [],
  price: 0,
} as NewGig;

export const gigReducer = (state: NewGig, action: Action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      if (!action.payload.name) return state;
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      if (action.payload.cover && action.payload.images) {
        return {
          ...state,
          cover: action.payload.cover,
          images: action.payload.images,
        };
      } else if (action.payload.cover && !action.payload.images) {
        return { ...state, cover: action.payload.cover };
      } else if (action.payload.images && !action.payload.cover) {
        return { ...state, images: action.payload.images };
      }
      return state;
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload?.feature ?? ""],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload.feature
        ),
      };

    default:
      return state;
  }
};
