import "./AboutMe.css";
import student from "../../images/student.jpg";

export default function AboutMe() {
  return (
    <section id="student" className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__age">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.{" "}
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  ВКонтакте
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__photo"
            src={student}
            alt="фотография разработчика приложения"
          />
        </div>
      </div>
    </section>
  );
}
