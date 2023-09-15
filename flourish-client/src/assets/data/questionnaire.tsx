import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export const questionnaireData = {
  name: { title: "Questionnaire Name", placeholder: "Enter a name" },
  questionnaires: "Questionnaires",
  questionField: {
    title: "Question",
    placeholder: "Enter a question",
  },
  options: "Options and Points",
  optionField: {
    option: { title: "Option", placeholder: "Enter an Option" },
    points: { title: "Points", placeholder: "Set Points" },
  },
  evaluationRange: "Evaluation Range",
  evaluationRangeField: {
    title: { title: "Title", placeholder: "Enter an Option" },
    points: { title: "Max Points", placeholder: "Set Points" },
  },

  button: {
    questionnaire: {
      add: {
        title: "Add Questionnaire",
        icon: <IoAddCircleOutline />,
      },
      remove: {
        title: "",
        icon: <IoRemoveCircleOutline />,
      },
    },
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
      add: { title: "Add an Option", icon: <IoAddCircleOutline /> },
      remove: { title: "", icon: <IoRemoveCircleOutline /> },
    },
    evaluationRange: {
      add: { title: "Add a Range", icon: <IoAddCircleOutline /> },
      remove: { title: "", icon: <IoRemoveCircleOutline /> },
    },
    save: {
      title: "Save",
    },
    reset: {
      title: "Reset",
    },
  },
};
