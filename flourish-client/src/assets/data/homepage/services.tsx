import { FaUser, FaUserGroup } from "react-icons/fa6";
import { GiMeditation } from "react-icons/gi";
import { RiSpeakFill } from "react-icons/ri";

export const servicesData = {
  title: "Services",
  description: "Currently available counseling services",
  services: [
    {
      icon: <FaUser fontSize={20} color="#4263eb" />,
      bgColor: "#dbe4ff",
      title: "individual psychotherapy",
      description:
        "A one-on-one discussion between the counselor and the client. The two form an alliance, relationship or bond that enables trust and personal growth",
    },
    {
      icon: <FaUserGroup fontSize={20} color="#37b24d" />,
      bgColor: "#d3f9d8",
      title: "group therapy",
      description:
        "A counseling group is usually comprised of six to eight students who meet face to face with one or two trained group therapists and talk about what most concerns them",
    },
    {
      icon: <GiMeditation fontSize={20} color="#1098ad" />,
      bgColor: "#c5f6fa",
      title: "relaxation training",
      description:
        "A number of techniques designed to teach someone to be able to relax voluntarily. These techniques are designed to reduce physical and mental tension",
    },
    {
      icon: <RiSpeakFill fontSize={20} color="#f59f00" />,
      bgColor: "#fff3bf",
      title: "social skill training",
      description:
        "A therapeutic approach used to improve interpersonal relations. The therapy focuses on verbal and nonverbal behaviors common in social relationships",
    },
  ],
};
