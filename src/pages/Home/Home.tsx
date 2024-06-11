import { Col, Container, Row } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../../components/Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { useEffect } from "react";
import { usePortfolioContext } from "../../../src/Contexts/portfolioContext"


interface IHomeProps {}

// eslint-disable-next-line no-empty-pattern
function Home({}: IHomeProps) {
  const { greeting, presentation, name, loadValues } = usePortfolioContext();

  useEffect(() => {
    loadValues();
  }, []);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {greeting}{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                {presentation}
                <strong className="main-name"> {name}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
