import { Col, Container, Row } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../../components/Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { Firestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface IHomeProps {
  db: Firestore | null;
}

function Home({ db }: IHomeProps) {
  const [greetings, setGreetings] = useState("");
  const [iAm, setIAm] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function init() {
      const docRef = doc(db!, "portfolio", "home");
      const docSnap = await getDoc(docRef);
      setGreetings(docSnap.data()!.greeting);
      setIAm(docSnap.data()!["i-am"]);
      setName(docSnap.data()!.name);
    }
    if (db) {
      init();
    }
  }, [db]);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {greetings}{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                {iAm}
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
