import './page.css';
import { IoMdCall } from "react-icons/io";
import { FaLine, FaFacebook, FaInstagram, FaMapMarkerAlt} from "react-icons/fa";

export default function Footer() {
const currentYear = new Date().getFullYear();

    return (
        <div className='footer-container'>
            <div>
                <h1 className='pks-brewing'>phetkasem brewing</h1>
                <h2 className='pks-location'>43 Soi Liap Khlong Phasi Charoen Fang Nuea 10<br/>Nong Khaem Sub-district Nong Khaem District, Bangkok</h2>
            </div>
            <div className='footer-inner'>
                <div className='colume1'>
                    <img src='/images/zunnero.png' alt='zunnero-logo' className='logo-zunnero'></img>
                    <span className='contact-us'>CONTACT US</span>
                    <div style={{display:'flex', marginTop:'15px', gap:'10px'}}>
                        <IoMdCall className='svg' ></IoMdCall>
                        <a target='_blank' href='tel:092-6541461' className='phone'>92-654-1461</a>( Monday - Friday 10:00 AM - 6:00 PM )
                    </div>
                    <div style={{display:'flex', marginTop:'15px', gap:'10px'}}>
                        <FaLine className='svg' ></FaLine>
                        <a target='_blank' href='' className='line'>@phetkasem</a>
                    </div>
                    <div style={{display:'flex', marginTop:'15px', gap:'10px'}}>
                        <FaFacebook className='svg'></FaFacebook>
                        <a target='_blank' href='https://www.facebook.com/phetkasembrewing' className='fb'>เพชรเกษม บรูวอิ้ง - Phetkasem brewing</a>
                    </div>
                    <div style={{display:'flex', marginTop:'15px', gap:'10px'}}>
                        <FaInstagram className='svg'></FaInstagram>
                        <a target='_blank' href='https://www.instagram.com/phetkasembrewing/' className='ig'>phetkasembrewing</a>
                    </div>
                </div>
                <div>
                    <div className='colume2'>
                    <span className='pks' style={{marginTop:'0px'}}>phetkasem brewing</span>
                    <h2 className='location'>43 Soi Liap Khlong Phasi Charoen<br/>Fang Nuea 10 Nong Khaem <br/>Nong Khaem<br/>Bangkok 10160</h2>
                    <div className='pin-location' style={{gap:'10px'}}>
                    <FaMapMarkerAlt className='svg-location'></FaMapMarkerAlt>
                    <a target='_blank' href='https://www.google.com/maps/place/43+%E0%B8%8B%E0%B8%AD%E0%B8%A2+%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B8%A2%E0%B8%9A%E0%B8%84%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5%E0%B9%80%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%9D%E0%B8%B1%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD+10+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%82%E0%B8%A1+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%82%E0%B8%A1+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10160/@13.6889399,100.3579517,17z/data=!3m1!4b1!4m6!3m5!1s0x30e2bdfa73248fb1:0xbd4eb44c068f7816!8m2!3d13.6889347!4d100.3605266!16s%2Fg%2F11h07s7jmb?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D'>Phetkasem brewery</a>
                    </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className='copyright-bar '>
                <p>Copyright &copy; {currentYear} Phetkasem Brewing. All Rights Reserved</p>
            </div>
        </div>
    )
}