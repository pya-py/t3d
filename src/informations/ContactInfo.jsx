import './info.css'

const ContactInfo = () => {
    return ( 
        <div className="card border-dark mb-3 singleCard" >
            <div className="card-header text-center border-dark">اطلاعات تماس</div>
            <div className="card-body text-center">
                <p>دانشگاه علم و صنعت ایران</p>
                <p>E-mail: <a href="https://mail.google.com">thcplusplus@gmail.com</a></p>
                <p>Phone Number: 0000000000000</p>
                <p>اطلاعات تماس استاد</p>
                <p>instagram: ......</p>
                <p>blah blah blah</p>
            </div>
        </div>
     );
}
 
export default ContactInfo;