import { Container,Row,Col } from "react-bootstrap";



const Footer = () => {
    const currentYear = new Date().getFullYear();
     return (
       <Container>
          <Row>
            <Col className="text-center py-3">
            <p>Dery922 &copy {currentYear}</p></Col>
          </Row>
       </Container>
     )
}



export default Footer;