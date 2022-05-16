import axios from "axios";
import requestConfig from "./config";
import requestConfigJson from "./configJson";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

class UserAPI {
	static EmployeeLogin(values) {
		return axios.post(`${BASE_URL}/user/login/`, values, requestConfigJson);
	}

	static EmployeeRegister(values) {
		return axios.post(`${BASE_URL}/user/register/`, values, requestConfigJson);
	}
}

export default UserAPI;
