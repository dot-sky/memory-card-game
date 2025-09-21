import GithubLogo from "../assets/github.svg";
import "../styles/Footer.css";
function Footer() {
  return (
    <footer>
      by{" "}
      <a href="https://github.com/dot-sky" target="_blank">
        @dot-sky
      </a>
      <a href="https://github.com/dot-sky" target="_blank">
        <img src={GithubLogo} width="20px" />
      </a>
    </footer>
  );
}
export { Footer };
