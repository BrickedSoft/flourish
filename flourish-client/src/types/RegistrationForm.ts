export enum RegistrationFormFields {
  ID = "id",
  NAME = "name",
  DATE_TIME = "date_time",
  GENDER = "gender",
  MARITAL_STATUS = "marital_status",
  OCCUPATION = "occupation",
  OCCUPATION_OTHERS = "occupation_others",
  DEPARTMENT = "department",
  PRESENT_ADDRESS = "present_address",
  HOME_DISTRICT = "home_district",
  MOBILE_NUMBER = "mobile_number",
  YOUR_PROBLEM = "your_problem",
  REFERRED_BY = "referred_by",
  TYPE_OF_SERVICE = "type_of_service",
  OFFICIAL_COMMENT = "official_comment",
  SUGGESTED_QUESTIONNAIRE = "suggested_questionnaire",
  SESSION_STATUS = "session_status",
  SESSION_TIME = "session_time",
  SESSION_LOCATION = "session_location",
  CREATED_AT = "created_at",
  CLIENT = "client",
  COUNSELOR = "counselor",
}

export interface RegistrationFormTypes {
  [RegistrationFormFields.ID]: string;
  [RegistrationFormFields.NAME]: string;
  [RegistrationFormFields.DATE_TIME]: string;
  [RegistrationFormFields.GENDER]: Gender;
  [RegistrationFormFields.MARITAL_STATUS]: MaritalStatus;
  [RegistrationFormFields.OCCUPATION]: Occupation;
  [RegistrationFormFields.OCCUPATION_OTHERS]?: string;
  [RegistrationFormFields.DEPARTMENT]?: Department;
  [RegistrationFormFields.PRESENT_ADDRESS]: string;
  [RegistrationFormFields.HOME_DISTRICT]: string;
  [RegistrationFormFields.MOBILE_NUMBER]: string;
  [RegistrationFormFields.YOUR_PROBLEM]: string;
  [RegistrationFormFields.REFERRED_BY]: ReferredBy;
  [RegistrationFormFields.TYPE_OF_SERVICE]: TypeOfService;
  [RegistrationFormFields.OFFICIAL_COMMENT]: string;
  [RegistrationFormFields.SUGGESTED_QUESTIONNAIRE]: string;
  [RegistrationFormFields.SESSION_STATUS]: SessionStatus;
  [RegistrationFormFields.SESSION_TIME]: string;
  [RegistrationFormFields.SESSION_LOCATION]: string;
  [RegistrationFormFields.CREATED_AT]: string;
  [RegistrationFormFields.CLIENT]: string;
  [RegistrationFormFields.COUNSELOR]: string;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHERS = "others",
}

export enum MaritalStatus {
  MARRIED = "married",
  UNMARRIED = "unmarried",
  DIVORCED = "divorced",
  SEPARATED = "separated",
  WIDOWED = "widowed",
}

export enum ReferredBy {
  SELF = "self",
  PARENTS = "parents",
  FAMILY = "family",
  FRIENDS = "friends",
  TEACHERS = "teachers",
  AUTHORITY = "authority",
  DOCTOR = "doctor",
  PSYCHIATRIST = "psychiatrist",
}

export enum TypeOfService {
  DONT_KNOW = "don't know",
  INDIVIDUAL_PSYCHOTHERAPY = "individual psychotherapy",
  SOCIAL_SKILL_TRAINING = "social skill training",
  RELAXATION_TRAINING = "relaxation training",
  GROUP_THERAPY = "group therapy",
}

export enum Occupation {
  STUDENT = "student",
  TEACHER = "teacher",
  OTHERS = "others",
}

export enum Department {
  ARCH = "Architecture",
  BANGLA = "Bangla",
  BBA = "Bachelor of Business Administration",
  CHEMISTRY = "Chemistry",
  CSE = "Computer Science and Engineering",
  ECONOMICS = "Economics",
  EEE = "Electrical and Electronics Engineering",
  ENGLISH = "English",
  IIT = "Institute of Information Technology",
  ISLAMIC_STUDIES = "Islamic Studies",
  JOURNALISM = "Journalism",
  LAW = "Law",
  MATHEMATICS = "Mathematics",
  NURSING = "Nursing",
  PHARMACEUTICAL_SCIENCE = "Pharmaceutical Science",
  PHARMACY = "Pharmacy",
  PHYSICS = "Physics",
  PUBLIC_HEALTH = "Public Health",
  SOCIOLOGY = "Sociology",
}

export enum SessionStatus {
  PENDING = "pending",
  CONFIRMING = "confirming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  REJECTED = "rejected",
}
