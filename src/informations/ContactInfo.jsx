import { Card } from 'react-bootstrap';
import './info.css'

const ContactInfo = () => {
    return ( 
        <Card border="dark" className="mb-3 singleCard" >
            <Card.Header className="text-center">اطلاعات تماس</Card.Header>
            <Card.Body className="text-right">
                <Card.Text>دانشگاه علم و صنعت ایران</Card.Text>
                <Card.Text>E-mail: <a href="https://mail.google.com">thcplusplus@gmail.com</a></Card.Text>
                <Card.Text>Phone Number: 0000000000000</Card.Text>
                <Card.Text>اطلاعات تماس استاد</Card.Text>
                <Card.Text>instagram: ......</Card.Text>
                <Card.Text>blah blah blah</Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default ContactInfo;