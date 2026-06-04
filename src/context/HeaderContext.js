import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAccessHeadComponent } from "../action/Common";
const HeaderContext = createContext();

export const HeaderComponentProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [headerComponent, setHeaderComponent] = useState(() => {
    return null;
  });

  useEffect(() => {
    dispatch(GetAccessHeadComponent());
  }, [dispatch]);

  return (
    <>
      <HeaderContext.Provider value={[headerComponent]}>
        {children}
      </HeaderContext.Provider>
    </>
  );
};
