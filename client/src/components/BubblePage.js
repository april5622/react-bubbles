import React, { useState, useEffect } from "react";
import axios from "axios";
import {useRouteMatch} from 'react-router-dom';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axoisWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const match = useRouteMatch();

  const fetchColor = () => {
    axoisWithAuth()
      .get("/colors")
      .then(res => {
        console.log(res);
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err);
      });
    
  };

  useEffect(() => {
    fetchColor(match.params.id);
  }, [match.params.id]);

  if (!colorList) {
    return <div>Loading bubbles </div>;
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
