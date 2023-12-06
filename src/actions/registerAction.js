import { httpService } from "../core/http-service";


export async function registerAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post("/Users", data);
    return response.status === 200;
  }