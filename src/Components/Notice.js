import "./Notice.css";

import slogo from "../images/shlogo.jpg";
import user from "../images/user.png";
import computer from "../images/dash.png";
import notic from "../images/notic.png";
import com from "../images/complain.png";
import photo from "../images/gallery.png";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Notice() {
  const [member, setmember] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/Dashbord")
      .then((res) => {
        if (res.data.valid) {
          setmember(res.data.member);
        } else {
          // alert("Login first..")
          navigate("/");
        }
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error to featch", err);
      });
  });

  const [notices, setnotice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notice")
      .then((response) => {
        // console.log('data come sucessful');

        setnotice(response.data);
      })
      .catch((err) => {
        console.log("Error Occer to featch Api", err);
      });
  });

  // let a=1;

  return (
    <div>
      <div className="flex p-9  bg-gray-600 ">
        <img src={slogo} alt="img" className="h-20  w-20  rounded-3xl" />
        <div className="px-5 py-5  text-5xl ">
        <h1 className=" text-orange-500">
            SHIVAJI MAHARAJ <span className=" text-white">SOCIETY</span>
          </h1> 
        </div>
      </div>
      <div className="main  flex">
        <div className="flex flex-col bg-gray-800  w-80 h-dvh">
          <div id="img_nav">
            <center>
              <img src={user} className="h-40 mt-10" alt="" />
              <h2 className="text-2xl  text-gray-400">{member}</h2>
            </center>
          </div>
          <div className="text-2xl  pt-20  ml-8  ">
            <div className="navi flex flex-col gap-8 text-white ">
              <Link to="/Dashbord" className="link act">
                <section className=" w-72 flex gap-4 ">
                  <img src={computer} alt="" />
                  <Link to="/Dashbord">Dashbord</Link>
                </section>
              </Link>
              <Link to="/Notic" className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={notic} alt="" />
                  <Link to="/Notic">Notic Board</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={com} alt="" />
                  <Link to="/Complain">Register Complain</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={photo} alt="" />
                  <Link to="/Photos">Photo Gallery</Link>
                </section>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-5xl p-6"> View Notice</h1>

          <div className="table-info">
            <table>
              <thead>
                <tr>
                  <th>sr_no</th>
                  <th>Notice_Heading</th>
                  <th>Notice_type</th>
                  <th>Notice_Date</th>

                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notic) => (
                  <tr>
                    <td>{notic.sr_no -1}</td>
                    <td>{notic.notice_heading}</td>
                    <td>{notic.notice_type}</td>
                    <td>{notic.notice_date}</td>
                    <td>{notic.notice_message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notice;
