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
  <div className="fixed bottom-0 flex h-10 w-full items-center justify-between bg-white px-4">
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
