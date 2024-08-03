import "./LoginPage.css";
import slogo from "../images/shlogo.jpg";
import building1 from "../images/building1.jpg";
import adminlogo from "../images/adminlogin.jpg";
import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [logindata, setlogindata] = useState({
    user_name: "",
    user_passwordl: "",
  });

  const navigate = useNavigate();

  const handleinput = (event) => {
    setlogindata((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  axios.defaults.withCredentials=true;
  const handleSubmitlogin = (event) => {
    event.preventDefault();
    console.log("data is", logindata);
    axios
      .post("http://localhost:5000/api/login", logindata)
      .then((res) => {
        if (res.data.Login) {
          alert("Namaste..");
          navigate("/Dashbord");
        } else if (res.data.username === true && res.data.password === false) {
          alert("Password is wrong");
        } else {
          alert("user name is wrong");
        }
      })
      .catch((err) => {
        console.log(" not featch api", err);
      });

    setlogindata({
      user_name: "",
      user_passwordl: "",
    });
  };

  return (
    <div>
      <div className="page">
        <div class="navbar">
          <img src={slogo} alt="img" className="logo" />
          <h1 className=" text-orange-500">
            SHIVAJI MAHARAJ <span className=" text-white">SOCIETY</span>
          </h1> 
          <nav>
            <ul>
              <li>
                <a href="#home" id="home" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#rules">Rules & Regulations</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
            </ul>
          </nav>
          <Link to="/Adminlogin" className="btn">
            Admin Login
          </Link>
        </div>
        <div className="row">
          <div className="col-1">
            <img src={building1} alt="img" />
          </div>
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                {/* <span onclick="login()">Login</span> */}
                <span>User Login</span>
                <img src={adminlogo} alt="" />

                {/* <hr id="indicator"/> */}
              </div>

              <form id="Regform" onSubmit={handleSubmitlogin}>
                <input
                  value={logindata.user_name}
                  onChange={handleinput}
                  type="text"
                  placeholder="Username"
                  name="user_name"
                  required
                />

                <input
                  value={logindata.user_passwordl}
                  onChange={handleinput}
                  type="password"
                  placeholder="Password"
                  name="user_passwordl"
                  required
                />

                <button type="submit" class="btn-losi">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="rules">
        <h1>Rules and Regulations</h1>
        <br />

        <li>
          Members and residents are required to keep their flats/homes and
          nearby premises clean and habitable.
        </li>
        <li>
          The residents should also maintain proper cleanliness etiquette while
          using common areas, parking lot, etc. and not throw litter from their
          balconies and windows.
        </li>
        <li>
          Members must regularly pay the maintenance charges and all other dues
          necessitated by the society.
        </li>
        <li>
          Keeping pets is allowed after submitting the required NOC to the
          society. But if pets like dogs are creating any kind of disturbance to
          other society members then the pets won't be allowed.
        </li>
        <li>
          Every member of the society should park their vehicles in their
          respective allotted parking spaces only.
        </li>
        <li>
          {" "}
          After using the community hall for any event or function it should be
          cleaned and no damages should be caused.
        </li>
        <li>
          No member can occupy the area near their front doors, corridors,
          passage for their personal usage.
        </li>
        <li>
          Salesmen, vendors or any other sellers are not allowed to enter the
          premises.
        </li>
        <li>Wastage and over usage of water is not allowed.</li>
        <li>
          Smoking in lobbies, passage is not allowed. If any irresponsible
          person is found smoking in the no smoking zone, he/she shall be
          charged with penalty.
        </li>
      </div>
      {/* footer code */}
      <footer>
        <div className="main-content">
          <div className="left box">
            <h2 id="about">About Us</h2>
            <div className="content">
              <p>
                SocietyHUB is webapp where society members can get all the
                updates related to their society. The members also get notified
                with notices and events held in society and can see information
                about members in society. Members can also post complaints
                regarding any issue in society.
              </p>
            </div>
          </div>
          <div className="center box adjust">
            <div className="cen">
              <h2>Quick Links</h2>
              <ul>
                <li>
                  <a href="#home">home</a>
                </li>
                <li>
                  <a href="#Regform">Login</a>
                </li>
                <li>
                  <a href="#rules">Rules and Regulations</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="right box">
            <h2>Address</h2>
            <div className="content">
              <div className="place">
                <span className="fas fa-map-marker-alt"></span>
                <span className="text">
                  Shivaji Maharaj Society, Bus stand road Porbandar
                </span>
              </div>
              <div className="phone">
                <span className="fas fa-phone-alt"></span>
                <span className="text">+91 8077974278</span>
              </div>
              <div className="email">
                <span className="fas fa-envelope"></span>
                <span className="text">societyHUB@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright">
          <h3>Copyright @2024| K.T.</h3>
        </div>
      </footer>
    </div>
  );
}



export default LoginPage;
