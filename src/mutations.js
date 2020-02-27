import {
  FETCH_METADATA,
  FETCH_LIBRARY,
  SET_PASSAGE,
  TOGGLE_INTERLINEAR,
} from '@/constants';

export default {
  [FETCH_METADATA]: (state, metadata) => {
    state.metadata = metadata;
  },
  [FETCH_LIBRARY]: (state, libraryTree) => {
    state.libraryTree = libraryTree;
  },
  [SET_PASSAGE]: (state, urn) => {
    state.passage = urn;
  },
  [TOGGLE_INTERLINEAR]: state => {
    state.interlinear = !state.interlinear;
  },
};
