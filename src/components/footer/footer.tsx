import { Github, Linkedin } from "assets";

const linkInfos = [
  {
    icon: Github,
    link: "https://github.com/DenianHoerlle/everest-todo-app",
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/denian-closs-hoerlle/",
  },
];

const Footer = () => (
  <div className="flex h-10 items-center justify-between bg-white px-4 opacity-70">
    <h2 className="mx-auto font-barlow">Developed by Dênian Hoerlle</h2>

    <div className="flex gap-5">
      {linkInfos.map(({ icon, link }) => (
        <a key={link} target="_blank" rel="noopener noreferrer" href={link}>
          <img src={icon} className="w-5" />
        </a>
      ))}
    </div>
  </div>
);

export default Footer;
