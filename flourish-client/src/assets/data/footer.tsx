import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { faker } from "@faker-js/faker";

import { ContactTypes } from "../../types/ContactTypes";

export const socialLinks = [
  {
    icon: <FaFacebook fontSize={"2.4rem"} color="#767676" />,
    href: "#",
  },
  {
    icon: <FaTwitter fontSize={"2.4rem"} color="#767676" />,
    href: "#",
  },
  {
    icon: <FaLinkedin fontSize={"2.4rem"} color="#767676" />,
    href: "#",
  },
];

export const copyright = [
  {
    data: `Copyright ${String.fromCodePoint(
      0x00a9
    )}${new Date().getFullYear()} by Flourish.`,
  },
  { data: "All rights reserved." },
];

export const contacts = [
  {
    title: faker.phone.number(),
    href: faker.phone.number(),
    type: ContactTypes.tel,
  },
  {
    title: faker.internet.email(),
    href: faker.internet.email(),
    type: ContactTypes.mail,
  },
];

export const accountLinks = [
  { title: "Create account", href: "/" },
  { title: "Sign in", href: "/" },
];

export const companyLinks = [
  { title: "About Flourish", href: "/" },
  { title: "Carriers", href: "/" },
  { title: "Sponsors", href: "/" },
];

export const supportLinks = [
  { title: "Help Center", href: "/" },
  { title: "FAQ", href: "/" },
  { title: "Cookies Settings", href: "/" },
];
