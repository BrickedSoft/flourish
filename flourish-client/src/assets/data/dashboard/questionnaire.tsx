import {
  IoAddCircleOutline,
  IoCreateOutline,
  IoPieChartOutline,
  IoRemoveCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";

export const questionnaireHeader = {
  list: "See all Questionnaires",
  new: "Create a new Questionnaire",
  fill: "Fill Questionnaire",
};

export const questionnaireList = {
  title: "Questionnaires",
  empty: {
    title: "No Questionnaires",
  },
  error: {
    title: "Try Again",
  },
};

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
        title: "Delete Questionnaire",
        icon: <IoTrashOutline />,
      },
      edit: {
        title: "Edit/View Questionnaire",
        icon: <IoCreateOutline />,
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
  empty: {
    questions: {
      title: "No Questions Added",
    },
    options: {
      title: "No Options Added",
    },
    evaluationRange: {
      title: "No Evaluations Added",
    },
  },
};

export const filledQuestionnaireData = {
  empty: {
    title: "No Questionnaires Filled",
  },
  evaluation: {
    title: "Evaluation",
  },
  button: {
    evaluate: {
      title: "Evaluate",
      icon: <IoPieChartOutline fontSize={20} />,
    },
    fill: {
      title: "Fill questionnaire",
      icon: <IoAddCircleOutline />,
    },
  },
};
