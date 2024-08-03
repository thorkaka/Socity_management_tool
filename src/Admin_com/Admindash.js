// import "./Dashbord.css";
import "./Admindash.css";

import slogo from "../images/shlogo.jpg";
import user from "../images/user.png";
import computer from "../images/dash.png";
import notic from "../images/notic.png";
import com from "../images/complain.png";
import photo from "../images/gallery.png";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

function Admindash() {
  const [mem, setmem] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/Dashbord")
      .then((res) => {
        if (res.data.valid) {
          setmem(res.data.member);
        } else {
          // alert("Login first..")
          navigate("/Adminlogin");
        }
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error to featch", err);
      });
  });
  const [members, setmember] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/member")
      .then((response) => {
        setmember(response.data);
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
          <h1 className="text-5xl p-6">Members Deatiles</h1>
          <div>
            <Link to="/Addmember" className="addbtn">
              <button type="submit" className="btn-losi ">
                Add Member
              </button>
            </Link>
          </div>
          <div className="table-info">
            <table>
              <thead>
                <tr>
                  <th className="">Member Id</th>
                  <th className="">Member Name</th>
                  <th className="">Member email</th>
                  <th className="">Member Mobile No</th>
                  <th className="">Member Password</th>
                </tr>
              </thead>

              <tbody>
                {members.map((member) => (
                  <tr>
                    <td>{member.user_id}</td>
                    <td>{member.user_name}</td>
                    <td>{member.user_email}</td>
                    <td>{member.user_mobile}</td>
                    <td>{member.user_passwordl}</td>
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

export default Admindash;
