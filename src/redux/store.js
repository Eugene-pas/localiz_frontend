import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rootReducer from './reducers/index';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel1
};

const persistReducer_ = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistReducer_);
export const persistor = persistStore(store);
