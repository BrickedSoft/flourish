import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export const questionnaireData = {
  name: { title: "Questionnaire Name", placeholder: "Enter a name" },
  questionnaires: "Questionnaires",
  questionnaireField: {
    title: "Question",
    placeholder: "Enter a question",
  },
  options: "Options and Points",
  optionField: {
    option: "Option",
    points: "Points",
  },

  button: {
    question: {
      add: {
        title: "Add a Question",
        icon: <IoAddCircleOutline />,
      },
      remove: {
        title: "",
        icon: <IoRemoveCircleOutline />,
      },
    },
    option: {
      title: "Add a option",
      icon: <IoAddCircleOutline />,
    },
    save: {
      title: "Save",
    },
    reset: {
      title: "Reset",
    },
  },
};
