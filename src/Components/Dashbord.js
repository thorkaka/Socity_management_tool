import "./Dashbord.css";
import download from "../images/businessman.png";
import slogo from "../images/shlogo.jpg";
import user from "../images/user.png";
import computer from "../images/dash.png";
import notic from "../images/notic.png";
import com from "../images/complain.png";
import photo from "../images/gallery.png";
import home from "../images/home.png";
import sec from "../images/man.png";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function Dashbord() {
  const [member, setmember] = useState("");
  const [hno, sethno] = useState("");
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/Dashbord")
      .then((res) => {
        if (res.data.valid) {
          sethno(res.data.uid);
          setmember(res.data.member);
          
        }else{
          // alert("Login first..")
          navigate("/");
        }
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error to featch", err);
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
        <div className="main_dash">
          <h1 className="text-7xl p-6"> Welcom to Dashbord </h1>
          <div className="cards flex gap-20 p-8">
            <div className="c1 bg-neutral-700 h-40 w-80 p-3 ">
              <section className="text-4xl text-white pl-3 ml-2 font-medium ">
                {member}
              </section>
              <section className="flex text-xl mt-5 pl-3">
                <p className=" text-zinc-500 mt-7 mr-5  "> Your Username</p>
                <img
                  src={download}
                  alt=""
                  className="
                 h-20"
                />
              </section>
            </div>
            <div className="c1 bg-neutral-700 h-40 w-80 p-3 ">
              <section className="text-3xl text-white pl-3 ml-2 font-medium ">
                {hno}
              </section>
              <section className="flex text-xl mt-5 pl-3">
                <p className=" text-zinc-500 mt-9 mr-5 "> Your house No.</p>
                <img
                  src={home}
                  alt=""
                  className="
                 h-20"
                />
              </section>
            </div>
            <div className="c1 bg-neutral-700 h-40 w-80 p-3 ">
              <section className="text-3xl text-white pl-3  font-medium ">
                M.V.Odi
              </section>
              <section className="flex text-xl mt-5 pl-3">
                <p className=" text-zinc-500 mt-9 mr-5 "> secretory Name</p>
                <img
                  src={sec}
                  alt=""
                  className="
                 h-20"
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
