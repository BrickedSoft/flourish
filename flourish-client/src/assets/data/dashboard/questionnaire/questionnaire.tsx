import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export const questionnaireData = {
  name: { title: "Questionnaire Group", placeholder: "Enter a name" },
  questionnaires: "All Questionnaires",
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
    questionnaire: {
      add: {
        title: "Add a Questionnaire",
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
