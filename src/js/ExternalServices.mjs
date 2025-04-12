const baseURL = import.meta.env.VITE_SERVER_URL;
import { alertMessage } from "./utils.mjs";

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`../json/${category}.json`);
    console.log(response);
    const data = await convertToJson(response);
    console.log(data)
    if(category  == "tents"){
      return data;
    }
    else{
      return data.Result;
  }
  }
  async checkout(order) {
    try {
      const url = `${baseURL}checkout`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };

      console.log(url);
      console.log(params);

      const response = await fetch(url, params);

      console.log(response.status);

      if (response.status === 400) {
        const errorResponse = await convertToJson(response);
        throw { name: "servicesError", message: errorResponse };
      }

      console.log(response);
      const data = await convertToJson(response);
      return data;
    } catch (error) {
      console.log("Error in checkout", error);
      if (error.name === "servicesError") {
        alertMessage(`Error: ${error.message.error || "Something went wrong. Please try again."}`);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
  async findProductById(id,category) {
    const response = await fetch(`../json/${category}.json`);
    console.log(response);
    const data = await convertToJson(response);
  
    if(category  == "tents"){
      const result = data.filter(item =>item.Id === id)
      return result
    }
    else{
      console.log(data.Result);
      const result = data.Result.filter(item =>item.Id === id)
      return result
  }
  }


}