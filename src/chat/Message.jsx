import { Fragment, useState, useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./chat.css";
import { useSelector } from "react-redux";
import { Device } from "../services/configs";
const Message = ({ msg, previousDay }) => {
    const { date } = msg; // destructure date from msg then make a new date object
    // reason for making new Date objects is that react throws error some time when you use it without new Date :|
    const [showDate, setShowDate] = useState(false); //for each day, the first message in that day has persian date above it
    const [time, setTime] = useState(null);
    const [persianDate, setPersianDate] = useState(null);
    const device = useSelector((state) => state.device);

    useEffect(() => {
        const persianDateObject = new DateObject({
            date: new Date(date),
            calendar: persian,
            locale: persian_fa,
        });
        setPersianDate(persianDateObject.format("dddd DD MMMM YYYY"));
        setTime(persianDateObject.format("hh:mm"));
        setShowDate(
            new Date(date).getDate() !== previousDay || previousDay === 0
        ); //     0 means this is the first message in the chat
    }, [date, previousDay]);

    return (
        <Fragment>
            {!showDate ? null : (
                <Fragment>
                    <hr />
                    <p className="messageDate">{persianDate}</p>
                </Fragment>
            )}
            {device !== Device.SmartPhone ? (
                <Row>
                    <Col>
                        {msg.me && (
                            <Alert className="w-100 text-right" variant="dark">
                                <Row>
                                    <Col>{msg.me}</Col>
                                    <Col className="messageTime" xs={3}>
                                        {time}
                                    </Col>
                                </Row>
                            </Alert>
                        )}
                    </Col>
                    <Col>
                        {msg.friend && (
                            <Alert
                                className="w-100 text-right"
                                variant="primary">
                                <Row>
                                    <Col>{msg.friend}</Col>
                                    <Col className="messageTime" xs={3}>
                                        {time}
                                    </Col>
                                </Row>
                            </Alert>
                        )}
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Alert className="w-100 text-right" variant="dark">
                        <Row>
                            <Col>{msg.me ? msg.me : msg.friend}</Col>
                            <Col className="messageTime" xs={3}>
                                {time}
                            </Col>
                        </Row>
                    </Alert>
                </Row>
            )}
        </Fragment>
    );
};

export default Message;
