import { Col, Nav, Row, Tab } from "react-bootstrap";
import "./competitions.css";
import CompetitionSummary from "./CompetitionSummary";

const CompetitionsMain = () => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <hr />

            <Row>
                <Col className="competition-menu-body" sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link className="text-right" eventKey="first">
                                جام حذفی
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-right" eventKey="second">
                                لیگ امتیازی
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-right" eventKey="third">
                                بازی شرطی
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-right" eventKey="forth">
                                جدول رندوم
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-right" eventKey="fifth">
                                و غیره
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                {/* <div style={{borderLeft: '1px solid gray', height:'500px'}}></div> */}
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <CompetitionSummary
                                title="جام حذفی"
                                summary="توضیحات این نوع مسابقه"
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <CompetitionSummary
                                title="لیگ امتیازی"
                                summary="توضیحات این نوع مسابقه"
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <CompetitionSummary
                                title="بازی شرطی"
                                summary="توضیحات این نوع مسابقه"
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="forth">
                            <CompetitionSummary
                                title="جدول رندوم"
                                summary="توضیحات این نوع مسابقه"
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="fifth">
                            <CompetitionSummary
                                title="و غیره"
                                summary="توضیحات این نوع مسابقه"
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default CompetitionsMain;
