import {
    ADD_TODO,
    LOAD_TODO,
    REMOVE_TODO,
    STATUS_DONE,
    STATUS_INITIAL,
    STATUS_LOADING,
    UPDATE_TODO
} from './statusActionTypes';
import {DataStatus} from "../../constants/DataStatus";
import {StatusNames} from "../../constants/StatusNames";

const initialState = DataStatus.initial;


export const createStatusReducers = prefix => (state = initialState, {type}) => {
    const withoutPrefix = type => {
        if (!StatusNames[prefix]) {
            throw new Error(`Invalid Type ${type}`);
        }
        return type.replace(`${prefix}_`, '');
    };


    switch (withoutPrefix(type)) {
        case STATUS_INITIAL:
            return DataStatus.initial;

        case STATUS_LOADING:
            return DataStatus.loading;

        case STATUS_DONE:
            return DataStatus.done;
    }

    return DataStatus.initial;
};