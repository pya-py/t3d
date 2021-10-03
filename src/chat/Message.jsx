import { Fragment, useState, useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./chat.css";
import { v1 as uuidv1 } from 'uuid'
const Message = ({ msg, previousDay, inDesktop }) => {
    const { date } = msg; // destructure date from msg then make a new date object
    // reason for making new Date objects is that react throws error some time when you use it without new Date :|
    const [showDate, setShowDate] = useState(false); //for each day, the first message in that day has persian date above it
    const [time, setTime] = useState(null);
    const [persianDate, setPersianDate] = useState(null);

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

    //note: Device.Desktop is 0 -> so it inDesktop is used conditionally but it actually contains device type and not a boolean
    return (
        <Fragment key={uuidv1()}>
            {!showDate ? null : (
                <Fragment>
                    <hr />
                    <p className="message-date">{persianDate}</p>
                </Fragment>
            )}
            <Row>
                <Col>
                    {msg.me && (
                        <Alert className="text-right" variant="dark">
                            {inDesktop ? (
                                <Row>
                                    <Col>{msg.me}</Col>
                                    <Col className="my-message-time" xs={3}>
                                        {time}
                                    </Col>
                                </Row>
                            ) : (
                                <Fragment>
                                    <Row>{msg.me}</Row>
                                    <Row className="my-message-time" xs={3}>
                                        {time}
                                    </Row>
                                </Fragment>
                            )}
                        </Alert>
                    )}
                </Col>
                <Col>
                    {msg.friend && (
                        <Alert className="text-right" variant="primary">
                            {inDesktop ? (
                                <Row>
                                    <Col className="friend-message-time" xs={3}>
                                        {time}
                                    </Col>
                                    <Col>{msg.friend}</Col>
                                </Row>
                            ) : (
                                <Fragment>
                                    <Row>{msg.friend}</Row>
                                    <Row className="friend-message-time" xs={3}>
                                        {time}
                                    </Row>
                                </Fragment>
                            )}
                        </Alert>
                    )}
                </Col>
            </Row>
        </Fragment>
    );
};

export default Message;
