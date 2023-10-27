import { FC, useEffect } from "react";
import { Box, Divider, Grid, Heading, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  formFieldsData,
  formData as registrationFormData,
} from "../../assets/data/dashboard/registrationForm";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  editRegistrationForm,
  fetchCounselorList,
  submitRegistrationForm,
} from "../../store/actions/registrationFormActions";
import {
  Department,
  Gender,
  MaritalStatus,
  Occupation,
  ReferredBy,
  RegistrationFormFields,
  RegistrationFormTypes,
  SessionStatus,
  TypeOfService,
} from "../../types/RegistrationForm";
import Container from "../common/Container";
import Buttons from "../dashboard/ButtonGroup";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import TextField from "./TextField";
import DateTimeField from "./DateTimeField";

type PropsType = {
  showButtons?: boolean;
  showButtonEach?: boolean[];
  isReadOnly?: boolean;
  formData?: RegistrationFormTypes;
  isClient?: boolean;
  isCounselor?: boolean;
  isAdmin?: boolean;
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

type OptionType = {
  value: string;
  label: string;
};

const CreateOptions = (
  labels: string[],
  values: string[],
  isValueLowercase = true
): OptionType[] => {
  const options: OptionType[] = [];
  for (let i = 0; i < labels.length; i++) {
    options.push({
      label: labels[i],
      value: isValueLowercase ? values[i].toLowerCase() : values[i],
    });
  }
  return options;
};

const RegistrationForm: FC<PropsType> = ({
  showButtons = true,
  showButtonEach = [true, true, true],
  isReadOnly = false,
  formData = initialForm,
  isClient = true,
  isCounselor = false,
  isAdmin = false,
}) => {
  isReadOnly = isAdmin || isCounselor ? true : isReadOnly;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);
  const counselorList = useAppSelector(
    (state) => state.registrationForm.counselorList
  );
  const questionnaireList = useAppSelector((state) => {
    const questionnaires = state.questionnaire.questionnaires;
    return _.chain(questionnaires)
      .mapValues((item) => ({
        value: item.id,
        label: item.name,
      }))
      .map((item) => item)
      .value();
  });

  useEffect(() => {
    if (name && !formData.name) formData.name = name;
    dispatch(fetchCounselorList());
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

  // console.log(watch(RegistrationFormFields.SESSION_TIME));
  // console.log(formData);

  const onSubmit = async (data: RegistrationFormTypes) => {
    const modifiedData = _.omit(data, [
      RegistrationFormFields.OCCUPATION_OTHERS,
    ]);

    if (data.occupation_others !== "")
      modifiedData.occupation = data.occupation_others as Occupation;

    if (!isAdmin && !isCounselor)
      await dispatch(submitRegistrationForm(modifiedData));

    if (isAdmin || isCounselor) {
      if (isAdmin) modifiedData.session_status = SessionStatus.CONFIRMING;
      if (isCounselor) modifiedData.session_status = SessionStatus.ONGOING;

      await dispatch(editRegistrationForm(modifiedData));
    }

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
              data={formData}
              titles={["", "", "Submit"]}
              showButtonEach={showButtonEach}
            />
          </Box>
        )}

        {/* -------------------------------------------------------------------------- */
        /*                                   Fields                                   */
        /* -------------------------------------------------------------------------- */}

        {/* ------------------------------- Admin Fields ------------------------------ */}

        {isAdmin && (
          <>
            <Heading color={"font.heroLight"} mb={0} textAlign={"center"}>
              {registrationFormData.fieldsHeading.admin}
            </Heading>
            <Grid
              templateColumns={"auto 1fr"}
              columnGap={128}
              rowGap={40}
              alignItems={"center"}
              pb={32}
            >
              <SelectField
                register={register}
                errors={errors}
                data={{
                  title: formFieldsData.assign_counselor.title,
                  placeholder: formFieldsData.assign_counselor.placeholder,
                  fieldName: RegistrationFormFields.COUNSELOR,
                }}
                options={CreateOptions(
                  _.map(counselorList, "user"),
                  _.map(counselorList, "id"),
                  false
                )}
                currentValue={watch(RegistrationFormFields.COUNSELOR)}
              />

              <SelectField
                register={register}
                errors={errors}
                data={{
                  title: formFieldsData.suggested_questionnaire.title,
                  placeholder:
                    formFieldsData.suggested_questionnaire.placeholder,
                  fieldName: RegistrationFormFields.SUGGESTED_QUESTIONNAIRE,
                }}
                options={questionnaireList as OptionType[]}
                currentValue={watch(RegistrationFormFields.COUNSELOR)}
              />

              <TextField
                errors={errors}
                register={register}
                data={{
                  title: formFieldsData.official_comment.title,
                  secondaryTitle:
                    formFieldsData.official_comment.secondaryTitle,
                  placeholder: formFieldsData.official_comment.placeholder,
                  fieldName: RegistrationFormFields.OFFICIAL_COMMENT,
                }}
              />
            </Grid>

            <Divider mb={16} />
          </>
        )}

        {/* ----------------------------- Counselor Fields ---------------------------- */}

        {isCounselor && (
          <>
            <Heading color={"font.heroLight"} mb={0} textAlign={"center"}>
              {registrationFormData.fieldsHeading.counselor}
            </Heading>
            <Grid
              templateColumns={"auto 1fr"}
              columnGap={128}
              rowGap={40}
              alignItems={"center"}
              pb={32}
            >
              <DateTimeField
                control={control}
                errors={errors}
                data={{
                  title: formFieldsData.session_time.title,
                  placeholder: formFieldsData.session_time.placeholder,
                  fieldName: RegistrationFormFields.SESSION_TIME,
                }}
                currentValue={watch(RegistrationFormFields.SESSION_TIME)}
              />

              <InputField
                errors={errors}
                register={register}
                data={{
                  title: formFieldsData.session_location.title,
                  placeholder: formFieldsData.session_location.placeholder,
                  fieldName: RegistrationFormFields.SESSION_LOCATION,
                }}
              />
            </Grid>

            <Divider mb={16} />
          </>
        )}

        {/* ------------------------------ CLient Fields ------------------------------ */}

        {(isAdmin || isCounselor) && (
          <Heading color={"font.heroLight"} mb={0} textAlign={"center"}>
            {registrationFormData.fieldsHeading.client}
          </Heading>
        )}

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
            options={CreateOptions(
              Object.values(Gender) as Array<Gender>,
              Object.values(Gender) as Array<Gender>
            )}
            currentValue={watch(RegistrationFormFields.GENDER)}
            isReadOnly={isReadOnly}
          />

          <RadioField
            control={control}
            data={{
              title: formFieldsData.occupation.title,
              placeholder: formFieldsData.occupation.placeholder,
              fieldName: RegistrationFormFields.OCCUPATION,
            }}
            options={CreateOptions(
              Object.values(Occupation) as Array<Occupation>,
              Object.values(Occupation) as Array<Occupation>
            )}
            currentValue={watch(RegistrationFormFields.OCCUPATION)}
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
              options={CreateOptions(
                Object.values(Department) as Array<Department>,
                Object.values(Department) as Array<Department>,
                true
              )}
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
            options={CreateOptions(
              Object.values(MaritalStatus) as Array<MaritalStatus>,
              Object.values(MaritalStatus) as Array<MaritalStatus>
            )}
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
            options={CreateOptions(
              Object.values(ReferredBy) as Array<ReferredBy>,
              Object.values(ReferredBy) as Array<ReferredBy>
            )}
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
            options={CreateOptions(
              Object.values(TypeOfService) as Array<TypeOfService>,
              Object.values(TypeOfService) as Array<TypeOfService>
            )}
            currentValue={watch(RegistrationFormFields.TYPE_OF_SERVICE)}
            isReadOnly={isReadOnly}
          />
        </Grid>
      </VStack>
    </Container>
  );
};

export default RegistrationForm;
