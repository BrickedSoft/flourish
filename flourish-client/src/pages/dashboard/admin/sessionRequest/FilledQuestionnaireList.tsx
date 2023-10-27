import { FC } from "react";
import { Divider, Heading, VStack } from "@chakra-ui/react";

import _ from "lodash";
import { filledQuestionnaireData } from "../../../../assets/data/dashboard/questionnaire";
import FilledQuestionnaireListGeneric from "../../../../components/questionnaire/FilledQuestionnaireListGeneric";
import { useAppSelector } from "../../../../hooks/useStore";
import { GetFilledQuestionnaireTypes } from "../../../../types/Questionnaire";

type FilledQuestionnaireType = {
  [key: string]: GetFilledQuestionnaireTypes;
};

type PropsType = {
  clientId: string;
};

const FilledQuestionnaireList: FC<PropsType> = ({ clientId }) => {
  const filledQuestionnaires = useAppSelector((state) => {
    const list = state.questionnaire.filledQuestionnaire;
    const filteredList = _.filter(list, { client: clientId });
    return filteredList;
  });
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );

  return (
    <VStack w={"full"} spacing={24} justifyContent={"stretch"}>
      <Divider mb={64} />

      <Heading color={"font.heroLight"} mb={0}>
        {filledQuestionnaireData.list}
      </Heading>

      <FilledQuestionnaireListGeneric
        filledQuestionnaires={
          filledQuestionnaires as unknown as FilledQuestionnaireType
        }
        questionnaires={questionnaires}
        showAddButton={false}
      />
    </VStack>
  );
};

export default FilledQuestionnaireList;
