"use client";

import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";


const Providers = ({ children }: PropsWithChildren) => {
    return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>{children}</PersistGate>
            </Provider>
    );
};

export default Providers;
