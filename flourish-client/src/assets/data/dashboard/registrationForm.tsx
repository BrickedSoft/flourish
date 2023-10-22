import { IoAddCircleOutline } from "react-icons/io5";

export const formHeader = {
  form: "Registration Form",
};

export const formList = {
  title: "Registration Form",
  empty: {
    title: "No Filled Form",
  },
  error: {
    title: "Try Again",
  },
};

export const formData = {
  button: {
    add: {
      title: "Fill a form",
      icon: <IoAddCircleOutline />,
    },
  },
};

export const formFieldsData = {
  name: { title: "Name", placeholder: "Enter your name" },
  gender: { title: "Gender", placeholder: "Select gender" },
  marital_status: {
    title: "Martial Status",
    placeholder: "Select martial status",
  },
  occupation: { title: "Occupation", placeholder: "Select your occupation" },
  department: {
    title: "Department",
    placeholder: "Select your department",
  },
  occupation_other: {
    title: "Other (Specify)",
    placeholder: "Your occupation",
  },
  present_address: {
    title: "Present Address",
    placeholder: "Enter your present address",
  },
  home_district: {
    title: "Home District",
    placeholder: "Enter your home district",
  },
  mobile_number: {
    title: "Mobile Number",
    placeholder: "01XXXXXXXXX",
  },
  your_problem: {
    title: "Your problem",
    secondaryTitle: "Write in short",
    placeholder: "Briefly write about your problem",
  },
  referred_by: {
    title: "Referred By",
    placeholder: "Enter the name of the person who referred you",
  },
  type_of_service: {
    title: "Type of service",
    placeholder: "Select the type of service you want",
  },
};
