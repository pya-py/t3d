import "./sidebars.css";
import { Fragment, useEffect, useState } from "react";
import noticeServices from "../services/http/noticeServices";
import Configs from "../services/configs";
import { Alert, Card } from "react-bootstrap";

const NoticeSideBar = () => {
    const [notices, setNotices] = useState([]);

    // oncomponentMount or update
    useEffect(() => {
        (async () => {
            try {
                const { status, data } =
                    await noticeServices.getShortNotices();
                if (status === Configs.Status.Successful) {
                    //return data.notices;
                    if (data.notices.length) setNotices(data.notices.reverse());
                    //if all is empty
                    else
                        setNotices([
                            { title: "پیام", text: "اطلاعیه جدیدی وجود ندارد" },
                        ]);
                }
            } catch (err) {
                setNotices([
                    {
                        title: "خطا",
                        text: "...مشکلی حین بارگذاری اطلاعیه ها پیش آمد. دوباره امتحان کنید",
                    },
                ]);
            }
        })();
    }, []);

    return (
        <Card className="noticeSidebar" border="success">
            <Card.Header className="text-center text-success">
                اطلاعیه ها
            </Card.Header>
            <Card.Body className="text-right">
                {notices.map((notice) => {
                    return (
                        <Fragment>
                            <Alert variant="info">
                                <i
                                    className="fa fa-info-circle px-3"
                                    aria-hidden="true"></i>
                                <span
                                    style={{ color: "red", fontSize: "18px" }}>
                                    {notice.title}
                                </span>
                                : {notice.text}
                            </Alert>
                            <hr />
                        </Fragment>
                    );
                })}
            </Card.Body>
        </Card>
    );
};

export default NoticeSideBar;
