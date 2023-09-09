import React from "react";
import { useParams } from "react-router-dom";

const QuestionnaireDetails = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default QuestionnaireDetails;
