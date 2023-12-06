import { redirect } from "react-router-dom";
import { httpService } from "../core/http-service";

export async function loginAction({request}) {
 const formData= await request.formData();
  const data =Object.fromEntries(formData);
  const response = await httpService.post('/Users/login',data);
  if(response.status===200){
    localStorage.setItem("token",response?.data.token);
   return redirect('/');
  }
}