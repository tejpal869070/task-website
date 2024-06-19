/* eslint-disable no-unused-vars */
import axios from "axios";
import { api } from "../config/api";
import Cookies from "js-cookie";

var mobile = Cookies.get("mobile");
var bearerToken = Cookies.get("token");

export const userRegistration = async (userData) => {
  try {
    const postData = {
      user_name: userData.user_name,
      mobile: userData.mobile,
      password: userData.password,
      reffer_by: userData.reffer_by,
      email: userData.email,
    };

    const response = await axios.post(`${api.API_URL}user/register`, postData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetPlanDetails = async () => {
  try {
    const response = await axios.post(`${api.API_URL}user/get-plans`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserDetails = async () => {
  try {
    const postData = {
      mobile: mobile,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${api.API_URL}user/user-details`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserDetail = async (formData) => {
  try {
    const postData = {
      mobile: mobile,
      email: formData.email,
      username: formData.uname,
      upi_id: formData.upi_id,
      pincode: formData.pincode,
      bank_name: formData.bank_name,
      ifsc_code: formData.ifsc_code,
      ac_no: formData.ac_no,
      ac_name: formData.ac_name,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${api.API_URL}user/update-user-details`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ChangePassword = async (formData) => {
  try {
    const postData = {
      mobile: mobile,
      password: formData.password,
      new_password: formData.new_password,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${api.API_URL}user/change-password`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetPaymentMethod = async () => {
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/get-pay-method`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const DepositRequest = async (formData) => {
  const formDataToSend = new FormData();
  formDataToSend.append("transection_id", formData.transection_id);
  formDataToSend.append("mobile", mobile);
  formDataToSend.append("d_image", formData.d_image);
  formDataToSend.append("amount", formData.amount);
  formDataToSend.append("deposit_id", formData.deposit_id);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/deposit-request`,
      formDataToSend,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserPaymentHistory = async () => {
  try {
    const postData = {
      mobile: mobile,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/get-deposit-request`,
      postData,
      axiosConfig
    );

    if (response) {
      return response.data;
    } else {
      return <p>Response not got form server</p>;
    }
  } catch (error) {
    return error;
  }
};

export const WithdrawRequest = async (formData) => {
  const postData = {
    mobile: mobile,
    amount: formData.amount,
    ac_name: formData.ac_name,
    ac_no: formData.ac_no,
    bank_name: formData.bank_name,
    ifsc_code: formData.ifsc_code,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/add-withdrawal-request`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CancelWithdrawalRequest = async (formData) => {
  const postData = {
    mobile: mobile,
    id: formData.id,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/decline-withdrawal-request`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const BuyPlan = async (formData) => {
  const postData = {
    mobile: mobile,
    id: formData.id,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/buy-plan`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckToken = async () => {
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/token-check`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetLikeTasks = async (formData) => {
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const data = await axios.post(
      `${api.API_URL}user/get-task-like`,
      postData,
      axiosConfig
    );
    return data.data.data;
  } catch (error) {
    throw error;
  }
};

export const GetCommentTasks = async (formData) => {
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/get-task-comment`,
      postData,
      axiosConfig
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const GetVideoTasks = async (formData) => {
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/get-video-task`,
      postData,
      axiosConfig
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const UpdateLikeCommentTask = async (formData) => {
  try {
    const postData = {
      mobile: mobile,
      id: formData.id,
      username: formData.username,
      status: formData.status,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/update-task`,
      postData,
      axiosConfig
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const GetPlanBuyHistory = async (formData) => {
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const data = await axios.post(
      `${api.API_URL}user/get-current-plans`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data;
    } else {
    }
  } catch (error) {
    throw error;
  }
};

export const UpdateVideoTask = async (formData) => {
  const postData = {
    mobile: mobile,
    id: formData.id,
    url: formData.url,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/update-video-task`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ContactUs = async (formData) => {
  try {
    const postData = new FormData();

    postData.append("email", formData.email);
    postData.append("subject", formData.subject);
    postData.append("image", formData.image);
    postData.append("message", formData.message);

    const response = await axios.post(
      `${api.API_URL}user/add-contact-us`,
      postData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetWinningWalletHistory = async () => {
  try {
    const postData = {
      mobile: mobile,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/get-statement`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetWinningByDate = async () => {
  try {
    const postData = {
      mobile: mobile,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/get-statement-date`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckUserExistance = async (formData) => {
  try {
    const postData = {
      mobile: formData.mobile,
      email: formData.email,
      reffer_by: formData.reffer_by,
    };

    const response = await axios.post(
      `${api.API_URL}user/check-user-existance`,
      postData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const VerifyOtp = async (formData) => {
  try {
    const postData = {
      email: formData.email,
      otp: formData.otp,
    };

    const response = await axios.post(
      `${api.API_URL}user/verify-otp`,
      postData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetReferData = async () => {
  try {
    const postData = {
      mobile: mobile,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/get-level`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SendOtp = async (emailid) => {
  try {
    const email = emailid;
    const dataToSend = {
      email: email,
    };
    const response = await axios.post(`${api.API_URL}user/get-otp`, dataToSend);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ForgetPassword = async (formData) => {
  try {
    const dataToSent = {
      email: formData.email,
      password: formData.password,
      token: formData.token,
    };

    const response = await axios.post(
      `${api.API_URL}user/forget-password`,
      dataToSent
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetWebsiteUser = async () => {
  try {
    const response = await axios.post(`${api.API_URL}user/get-increase-user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateWebsiteUser = async () => {
  try {
    const response = await axios.post(
      `${api.API_URL}user/update-increase-user`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
