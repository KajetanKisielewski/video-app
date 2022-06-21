/* eslint-disable no-unused-vars */
import React from 'react';
import useURLGenerate from './useURLGenerete';

import { FETCH_ACTIONS } from '../helpers/actions';
import { fetchReducer } from '../reducer';

import { createInitState } from '../helpers/auxiliaryFunctions';

const useFetch = () => {
    const [state, dispatch] = React.useReducer(fetchReducer, createInitState());

    React.useEffect(() => {
        if (url !== null) {
            dispatch({ type: FETCH_ACTIONS.API_REQUEST });
            fetch(url)
                .then((resp) => {
                    if (resp.ok) return resp.json();
                    return Promise.reject(resp);
                })
                .then((resp) => {
                    dispatch({ type: FETCH_ACTIONS.FETCH_DATA, payload: resp });
                })
                .catch((err) => {
                    dispatch({ type: FETCH_ACTIONS.ERROR, payload: err });
                });
        }
    }, [url]);
    return state;
};

export default useFetch;
