import { FC, useEffect } from "react";
import { Box, Grid, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { formFieldsData } from "../../assets/data/dashboard/registrationForm";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { submitRegistrationForm } from "../../store/actions/formActions";
import {
  Department,
  RegistrationFormFields,
  Gender,
  MaritalStatus,
  Occupation,
  ReferredBy,
  RegistrationFormTypes,
  SessionStatus,
  TypeOfService,
} from "../../types/RegistrationForm";
import Container from "../common/Container";
import Buttons from "../dashboard/Buttons";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import TextField from "./TextField";

type PropsType = {
  showButtons?: boolean;
  showButtonEach?: boolean[];
  isReadOnly?: boolean;
  formData?: RegistrationFormTypes;
};

const initialForm: RegistrationFormTypes = {
  id: "",
  name: "",
  date_time: new Date().toISOString(),
  gender: Gender.MALE,
  marital_status: "" as MaritalStatus,
  occupation: Occupation.STUDENT,
  department: "" as Department,
  occupation_others: "",
  present_address: "",
  home_district: "",
  mobile_number: "",
  your_problem: "",
  referred_by: "" as ReferredBy,
  type_of_service: "" as TypeOfService,
  official_comment: "",
  suggested_questionnaire: "",
  session_status: SessionStatus.PENDING,
  session_time: "",
  session_location: "",
  created_at: new Date().toISOString(),
  client: "",
  counselor: "",
};

const RegistrationForm: FC<PropsType> = ({
  showButtons = true,
  showButtonEach = [true, true, true],
  isReadOnly = false,
  formData = initialForm,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);

  useEffect(() => {
    if (name && !formData.name) formData.name = name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { isDirty, errors, isSubmitting, isValid },
  } = useForm({ defaultValues: formData });

  const occupation = watch(
    RegistrationFormFields.OCCUPATION,
    initialForm.occupation
  );

  const onSubmit = async (data: RegistrationFormTypes) => {
    const modifiedData = _.omit(data, [
      RegistrationFormFields.OCCUPATION_OTHERS,
    ]);

    if (data.occupation_others !== "")
      modifiedData.occupation = data.occupation_others as Occupation;

    await dispatch(submitRegistrationForm(modifiedData));
    navigate(-1);
  };

  return (
    <Container w={"full"} borderRadius={"xl"}>
      <VStack
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        flexDirection={"column"}
        alignItems={"stretch"}
        gap={64}
      >
        {/* --------------------------------- Buttons -------------------------------- */}

        {showButtons && (
          <Box
            position={"sticky"}
            pt={32}
            pb={16}
            top={0}
            zIndex={50}
            bg={"white"}
          >
            <Buttons
              isSubmitting={isSubmitting}
              isDirty={isDirty}
              isValid={isValid}
              reset={reset}
              data={initialForm}
              titles={["", "", "Submit"]}
              showButtonEach={showButtonEach}
            />
          </Box>
        )}

        {/* --------------------------------- Fields --------------------------------- */}

        <Grid
          templateColumns={"auto 1fr"}
          columnGap={128}
          rowGap={40}
          alignItems={"center"}
          pb={32}
        >
          <InputField
            errors={errors}
            register={register}
            data={{
              title: formFieldsData.name.title,
              placeholder: formFieldsData.name.placeholder,
              fieldName: RegistrationFormFields.NAME,
            }}
            isReadOnly={isReadOnly}
          />

          <RadioField
            control={control}
            data={{
              title: formFieldsData.gender.title,
              placeholder: formFieldsData.gender.placeholder,
              fieldName: RegistrationFormFields.GENDER,
            }}
            options={Object.values(Gender) as Array<Gender>}
            isReadOnly={isReadOnly}
          />

          <RadioField
            control={control}
            data={{
              title: formFieldsData.occupation.title,
              placeholder: formFieldsData.occupation.placeholder,
              fieldName: RegistrationFormFields.OCCUPATION,
            }}
            options={Object.values(Occupation) as Array<Occupation>}
            isReadOnly={isReadOnly}
          />

          {occupation === Occupation.STUDENT ||
          occupation === Occupation.TEACHER ? (
            <SelectField
              register={register}
              errors={errors}
              data={{
                title: formFieldsData.department.title,
                placeholder: formFieldsData.department.placeholder,
                fieldName: RegistrationFormFields.DEPARTMENT,
              }}
              options={Object.values(Department) as Array<Department>}
              currentValue={watch(RegistrationFormFields.DEPARTMENT)}
              isReadOnly={isReadOnly}
            />
          ) : (
            <InputField
              errors={errors}
              register={register}
              data={{
                title: formFieldsData.occupation_other.title,
                placeholder: formFieldsData.occupation_other.placeholder,
                fieldName: RegistrationFormFields.OCCUPATION_OTHERS,
              }}
              isReadOnly={isReadOnly}
            />
          )}

          <SelectField
            register={register}
            errors={errors}
            data={{
              title: formFieldsData.marital_status.title,
              placeholder: formFieldsData.marital_status.placeholder,
              fieldName: RegistrationFormFields.MARITAL_STATUS,
            }}
            options={Object.values(MaritalStatus) as Array<MaritalStatus>}
            currentValue={watch(RegistrationFormFields.MARITAL_STATUS)}
            isReadOnly={isReadOnly}
          />

          <InputField
            errors={errors}
            register={register}
            data={{
              title: formFieldsData.present_address.title,
              placeholder: formFieldsData.present_address.placeholder,
              fieldName: RegistrationFormFields.PRESENT_ADDRESS,
            }}
            isReadOnly={isReadOnly}
          />

          <InputField
            errors={errors}
            register={register}
            data={{
              title: formFieldsData.home_district.title,
              placeholder: formFieldsData.home_district.placeholder,
              fieldName: RegistrationFormFields.HOME_DISTRICT,
            }}
            isReadOnly={isReadOnly}
          />

          <InputField
            errors={errors}
            register={register}
            data={{
              title: formFieldsData.mobile_number.title,
              placeholder: formFieldsData.mobile_number.placeholder,
              fieldName: RegistrationFormFields.MOBILE_NUMBER,
            }}
            isReadOnly={isReadOnly}
          />

          <TextField
            errors={errors}
            register={register}
            data={{
              title: formFieldsData.your_problem.title,
              secondaryTitle: formFieldsData.your_problem.secondaryTitle,
              placeholder: formFieldsData.your_problem.placeholder,
              fieldName: RegistrationFormFields.YOUR_PROBLEM,
            }}
            isReadOnly={isReadOnly}
          />

          <SelectField
            register={register}
            errors={errors}
            data={{
              title: formFieldsData.referred_by.title,
              placeholder: formFieldsData.referred_by.placeholder,
              fieldName: RegistrationFormFields.REFERRED_BY,
            }}
            options={Object.values(ReferredBy) as Array<ReferredBy>}
            currentValue={watch(RegistrationFormFields.REFERRED_BY)}
            isReadOnly={isReadOnly}
          />

          <SelectField
            register={register}
            errors={errors}
            data={{
              title: formFieldsData.type_of_service.title,
              placeholder: formFieldsData.type_of_service.placeholder,
              fieldName: RegistrationFormFields.TYPE_OF_SERVICE,
            }}
            options={Object.values(TypeOfService) as Array<TypeOfService>}
            currentValue={watch(RegistrationFormFields.TYPE_OF_SERVICE)}
            isReadOnly={isReadOnly}
          />
        </Grid>
      </VStack>
    </Container>
  );
};

export default RegistrationForm;
