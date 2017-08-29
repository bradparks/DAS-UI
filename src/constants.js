export const IS_DEBUG = window.location.search.indexOf('debug') >= 0;

export const GRID_SIZE = 24;
export const DEFAULT_BLOCK_WIDTH = 5;
export const MIN_BLOCK_WIDTH = 3;
export const MIN_BLOCK_HEIGHT = 1;

export const NEW_BLOCK_NAME = '__NEW_BLOCK__';

export const CANCEL_CONNECT_OR_FIND = 'CANCEL_CONNECT_OR_FIND';
export const CANCEL_UPSERT_BLOCK = 'CANCEL_UPSERT_BLOCK';
export const CLOSE_NEW_BLOCK_PROMPT = 'CLOSE_NEW_BLOCK_PROMPT';
export const CONNECT_FROM_INPUT = 'CONNECT_FROM_INPUT';
export const CONNECT_FROM_INPUT_TYPED_LETTER = 'CONNECT_FROM_INPUT_TYPED_LETTER';
export const CONNECT_FROM_OUTPUT = 'CONNECT_FROM_OUTPUT';
export const CONNECT_FROM_OUTPUT_TYPED_LETTER = 'CONNECT_FROM_OUTPUT_TYPED_LETTER';
export const CREATE_BLOCK = 'CREATE_BLOCK';
export const DELETE_BLOCK = 'DELETE_BLOCK';
export const DELETE_CONNECTION_FROM_INPUT = 'DELETE_CONNECTION_FROM_INPUT';
export const DELETE_CONNECTION_FROM_OUTPUT = 'DELETE_CONNECTION_FROM_OUTPUT';
export const FIND_BLOCK = 'FIND_BLOCK';
export const FIND_BLOCK_TYPED_LETTER = 'FIND_BLOCK_TYPED_LETTER';
export const MOVE_BLOCK = 'MOVE_BLOCK';
export const MOVE_CURSOR = 'MOVE_CURSOR';
export const RESIZE_BLOCK = 'RESIZE_BLOCK';
export const SET_BLOCK_STATE = 'SET_BLOCK_STATE';
export const SHOW_NEW_BLOCK_PROMPT = 'SHOW_NEW_BLOCK_PROMPT';
export const UPSERT_BLOCK = 'UPSERT_BLOCK';
