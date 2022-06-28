import React from 'react';

import { FETCH_ACTIONS } from '../helpers/actions';
import { fetchReducer } from '../reducer';
import { createInitState } from '../helpers/auxiliaryFunctions';

const useFetch = (generatedFetchParameters) => {
    const [state, dispatch] = React.useReducer(fetchReducer, createInitState());

    React.useEffect(() => {
        generatedFetchParameters.forEach((item) => {
            const [path, options = { method: 'GET' }] = item;

            dispatch({ type: FETCH_ACTIONS.API_REQUEST });

            fetch(path, options)
                .then((resp) => {
                    if (resp.ok) return resp.json();

                    return Promise.reject(resp);
                })
                .then( (resp) => {
                    dispatch({ type: FETCH_ACTIONS.FETCH_DATA, payload: resp });
                })
                .catch((err) => {
                    dispatch({ type: FETCH_ACTIONS.ERROR, payload: err });
                });
        });
    }, [generatedFetchParameters]);

    return state;
};;

export default useFetch;
