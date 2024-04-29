/* eslint-disable no-unused-vars */
import axios from "axios";
import { api } from "../config/api";
import Cookies from "js-cookie";

var mobile = Cookies.get("mobile");
var bearerToken = Cookies.get("token");

export const userRegistration = async (userData) => {
  console.log(userData);
  try {
    const postData = {
      user_name: userData.user_name,
      mobile: userData.mobile,
      password: userData.password,
      reffer_by: userData.reffer_by,
      email: userData.email,
    };

    const response = await axios.post(`${api.API_URL}user/register`, postData);

    if (response) {
      return response.data;
    } else {
      return <p>Response not got form server</p>;
    }
  } catch (error) {
    return error;
  }
};

export const GetPlanDetails = async () => {
  try {
    const response = await axios.post(`${api.API_URL}user/get-plans`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
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
    console.error("Error:", error);
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
    console.error("Error:", error);
  }
};

export const ChangePassword = async (formData) => {
  console.log(formData);
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
    console.error("Error:", error);
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
    const data = await axios.post(
      `${api.API_URL}user/get-pay-method`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data;
    } else {
      console.log("error");
    }
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
  formDataToSend.append("id", formData.id);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const data = await axios.post(
      `${api.API_URL}user/deposit-request`,
      formDataToSend,
      axiosConfig
    );
    if (data) {
      return data.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    return error;
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
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const data = await axios.post(
      `${api.API_URL}user/add-withdrawal-request`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    return error;
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
    const data = await axios.post(
      `${api.API_URL}user/decline-withdrawal-request`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    return error;
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
    const data = await axios.post(
      `${api.API_URL}user/buy-plan`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    return error;
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
    if (response.data) {
      return response.data;
    } else {
      console.log("Error. response not got");
    }
  } catch (error) {
    console.log(error);
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
    if (data) {
      return data.data.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    return error;
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
    const data = await axios.post(
      `${api.API_URL}user/get-task-comment`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    return error;
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
    const data = await axios.post(
      `${api.API_URL}user/get-video-task`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data.data;
    } else {
      console.log("error");
    }
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
      console.log("error");
    }
  } catch (error) {
    return error;
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
    const data = await axios.post(
      `${api.API_URL}user/update-video-task`,
      postData,
      axiosConfig
    );
    if (data) {
      return data.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    return error;
  }
};

export const ContactUs = async (formData) => {
  try {
    const postData = new FormData();

    postData.append("email", formData.email);
    postData.append("subject", formData.subject);
    postData.append("image", formData.image);
    postData.append("message", formData.message);

    const data = await axios.post(
      `${api.API_URL}user/add-contact-us`,
      postData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (data) {
      return data.data;
    } else {
      console.log("error");
    }
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

    if (response) {
      return response.data;
    } else {
      return <p>Response not got form server</p>;
    }
  } catch (error) {
    return error;
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

    if (response) {
      return response.data;
    } else {
      return <p>Response not got form server</p>;
    }
  } catch (error) {
    return error;
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

    if (response) {
      return response.data;
    } else {
      return <p>Response not got form server</p>;
    }
  } catch (error) {
    return error;
  }
};

export const VerifyOtp = async (formData) => {
  try {
    const postData = {
      mobile: formData.mobile,
      otp: formData.otp,
    };

    const response = await axios.post(
      `${api.API_URL}user/verify-otp`,
      postData
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
    if (response.data.status === true) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};
