import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./contexts/counterslice";
import taskReducer from "./contexts/taskslice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        tasks: taskReducer,
    },
});