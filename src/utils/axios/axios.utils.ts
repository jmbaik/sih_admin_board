import axios from "axios";
export const fetchData = async (url: string) => {
  try {
    const res = await axios(url);
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};
