import { Alert, Badge, Container, Row, Col, Button } from "react-bootstrap";

const CompetitionSummary = ({ title, summary }) => {
    return (
        <Container>
            <Row>
                <Alert className="text-right w-100" variant="info">
                    <Alert.Heading className="text-center">
                        <Badge variant="success p-2" >
                            {title}
                        </Badge>
                    </Alert.Heading>

                    <p>{summary}</p>
                    <p>{summary}</p>
                    <p>{summary}</p>
                    <p>{summary}</p>
                </Alert>
            </Row>
            <hr />
            <Row>
                <Alert className="text-right w-100" pill variant="info">
                    <p>تعداد شرکت کنندگان : 00000000</p>
                    <p>نکات دیگر</p>
                </Alert>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Button block variant="outline-success">شرکت در مسابقه</Button>
                </Col>
                <Col>
                <Button block variant="outline-secondary">بازیکنان حاضر</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CompetitionSummary;
