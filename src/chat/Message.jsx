import { Fragment, useState, useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./chat.css";

const Message = ({ msg, previousDay, inSmartphone }) => {
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

    //note: Device.Smartphone is 0 -> so it inSmartphone is used conditionally but it actually contains device type and not a boolean
    return (
        <Fragment>
            {!showDate ? null : (
                <Fragment>
                    <hr />
                    <p className="messageDate">{persianDate}</p>
                </Fragment>
            )}
            <Row>
                <Col>
                    {msg.me && (
                        <Alert className="w-100 text-right" variant="dark">
                            {!inSmartphone ? (
                                <Row>
                                    <Col>{msg.me}</Col>
                                    <Col className="messageTime" xs={3}>
                                        {time}
                                    </Col>
                                </Row>
                            ) : (
                                <Fragment>
                                    <Row>{msg.me}</Row>
                                    <Row className="messageTime" xs={3}>
                                        {time}
                                    </Row>
                                </Fragment>
                            )}
                        </Alert>
                    )}
                </Col>
                <Col>
                    {msg.friend && (
                        <Alert className="w-100 text-right" variant="primary">
                            {!inSmartphone ? (
                                <Row>
                                    <Col>{msg.friend}</Col>
                                    <Col className="messageTime" xs={3}>
                                        {time}
                                    </Col>
                                </Row>
                            ) : (
                                <Fragment>
                                    <Row>{msg.friend}</Row>
                                    <Row className="messageTime" xs={3}>
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
