import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const apiUserCourse = axios.create({
  baseURL: "https://6872097376a5723aacd36e39.mockapi.io/", /////11:04

  headers: {
    Authorization: `Bearer ${Cookies.get("userToken")}`,
  },
});

export default apiUserCourse;
