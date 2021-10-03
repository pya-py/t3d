
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import '../profile.css';

const Record = ({children,title}) => {
    return (
        <ListGroup.Item className="bg-transparent">
            <Row className="py-2">
                <Col className="text-center">
                    <Card.Text>{title}</Card.Text>
                </Col>
                <Col className="text-center">
                    <Badge
                        className="friend-badge-font-size"
                        pill
                        variant="primary">
                        {children}
                    </Badge>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default Record;
