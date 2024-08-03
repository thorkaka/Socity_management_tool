// import "./Dashbord.css";
import "./ViewComplain.css";

import slogo from "../images/shlogo.jpg";
import user from "../images/user.png";
import computer from "../images/dash.png";
import notic from "../images/notic.png";
import com from "../images/complain.png";
import photo from "../images/gallery.png";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function ViewComplain() {
  const [mem,setmem]=useState("");
  const navigate= useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/Dashbord")
      .then((res) => {
        if (res.data.valid) {
          
          setmem(res.data.member);
          
        }else{
          // alert("Login first..")
          navigate("/Adminlogin");
        }
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error to featch", err);
      });
  });


  const [complains, setcomplains] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/complain")
      .then((response) => {
        setcomplains(response.data);
      })
      .catch((err) => {
        console.log("Error Occer to featch Api", err);
      });
  });
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
              <h2 className="text-2xl  text-gray-400">{mem} Admin</h2>
            </center>
          </div>
          <div className="text-2xl  pt-20  ml-8  ">
            <div className="navi flex flex-col gap-8 text-white ">
              <Link to="/Admindash" className="link act">
                <section className=" w-72 flex gap-4 ">
                  <img src={computer} alt="" />
                  <Link to="/Admindash">Manage Member</Link>
                </section>
              </Link>
              <Link to="/AdminNotic" className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={notic} alt="" />
                  <Link to="/AdminNotic">Add Notice</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={com} alt="" />
                  <Link to="/ViewComplain">View Complains</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={photo} alt="" />
                  <Link to="/Adminphots">Photo Gallery</Link>
                </section>
              </Link>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-7xl p-6 "> Complains</h1>

          <div>

          <table className="com-table ">
              <div className="">
                <th className="">User_id</th>
                <th className=" ">Complain Heading</th>
                <th>Complain Message</th>
              </div>
              {complains.map((complain) => (
                <div key={complain.id} className="">
                  <tr>
                    <td>{complain.user_id}</td>
                    <td className="">{complain.com_heading}</td>
                    <td className="">{complain.com_desc}</td>
                  </tr>
                </div>
              ))}
            </table>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewComplain;



