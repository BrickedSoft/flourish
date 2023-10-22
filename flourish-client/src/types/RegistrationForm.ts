export enum FormFields {
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
}

export interface RegistrationForm {
  [FormFields.NAME]: string;
  [FormFields.DATE_TIME]: string;
  [FormFields.GENDER]: Gender;
  [FormFields.MARITAL_STATUS]: MaritalStatus;
  [FormFields.OCCUPATION]: Occupation;
  [FormFields.OCCUPATION_OTHERS]?: string;
  [FormFields.DEPARTMENT]?: Department;
  [FormFields.PRESENT_ADDRESS]: string;
  [FormFields.HOME_DISTRICT]: string;
  [FormFields.MOBILE_NUMBER]: string;
  [FormFields.YOUR_PROBLEM]: string;
  [FormFields.REFERRED_BY]: ReferredBy;
  [FormFields.TYPE_OF_SERVICE]: TypeOfService;
  [FormFields.OFFICIAL_COMMENT]: string;
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
