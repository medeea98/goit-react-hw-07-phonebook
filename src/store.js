import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import axios from 'axios';

axios.defaults.baseURL = 'https://66504035ec9b4a4a603149e3.mockapi.io/';

const persistConfig = {
    key: 'root',
    storage
};

const initialState = {
    contacts: {
        items: [],
        isLoading: false,
        error: null
    },
    filter: ""
};

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async () => {
        try {
            const response = await axios.get('/contacts');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contactData) => {
        try {
            const response = await axios.post('/contacts', contactData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId) => {
        try {
            await axios.delete(`/contacts/${contactId}`);
            return contactId;
        } catch (error) {
            throw error;
        }
    }
)

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: initialState.contacts,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(contact => contact.id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

const store = configureStore({
    reducer: {
        contacts: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [fetchContacts.pending, fetchContacts.rejected, fetchContacts.fulfilled,
                                addContact.pending, addContact.rejected, addContact.fulfilled,
                                deleteContact.pending, deleteContact.rejected, deleteContact.fulfilled , 'persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export const { setFilter } = contactsSlice.actions;
export default store;