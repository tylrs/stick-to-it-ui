import "./App.css";
import { useEffect, useState } from "react";
import { NotificationState, UserType } from "../../utils/types";
import { Routes, Route, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Login from "../Login/Login";
import AccountCreation from "../AccountCreation/AccountCreation";
import { calculateNumInvitations, getCurrentUser } from "../../utils/miscUtils";
import HabitsList from "../HabitsList/HabitsList";
import { emptyUser } from "../../utils/miscConstants";
import HabitCreation from "../HabitCreation/HabitCreation";
import Header from "../Header/Header";
import {
  getReceivedInvitations,
  getSentInvitations,
} from "../../utils/apiCalls";

const App = () => {
  const [user, setUser] = useState<UserType>(emptyUser);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [invitationsInfo, setInvitationsInfo] = useState<NotificationState>({
    received: [],
    sent: [],
  });

  const logOut = () => {
    localStorage.clear();
    setUser(emptyUser);
    navigate("/login");
  };

  const getInvitations = async () => {
    console.log("getting invitations");
    try {
      const receivedResponse = await getReceivedInvitations(user.id);
      const sentResponse = await getSentInvitations(user.id);
      setInvitationsInfo(() => {
        return {
          received: receivedResponse,
          sent: sentResponse,
        };
      });
    } catch (err: any) {
      console.log(err);
      // setError(err.errors);
    }
  };

  useEffect(() => {
    if (message) {
      let timer1 = setTimeout(() => {
        setMessage("");
      }, 1300);
      return () => {
        clearTimeout(timer1);
      };
    }
  });

  useEffect(() => {
    if (!user.id && localStorage.getItem("currentUser")) {
      setUser(getCurrentUser());
    }
  }, [user]);

  useEffect(() => {
    if (user.id) {
      getInvitations();
    }
  }, [user.id, invitationsInfo.received.length, invitationsInfo.sent.length]);

  return (
    <main>
      {!!user.id ? (
        <Header
          headerType={"loggedIn"}
          logOut={logOut}
          message={message}
          setShowModal={setShowModal}
          invitationsInfoCount={calculateNumInvitations(invitationsInfo)}
        />
      ) : (
        <Header headerType={"loggedOut"} />
      )}
      <div className="overlay hidden"></div>
      {!user.id ? (
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/create-account"
            element={<AccountCreation setUser={setUser} />}
          />
          <Route path="*" element={<Welcome />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <HabitsList
                userId={user.id}
                name={user.name}
                listType={"all"}
                setMessage={setMessage}
                showModal={showModal}
                setShowModal={setShowModal}
                invitationsInfo={invitationsInfo}
              />
            }
          />
          <Route
            path="/all-habits"
            element={
              <HabitsList
                userId={user.id}
                name={user.name}
                listType={"all"}
                setMessage={setMessage}
                showModal={showModal}
                setShowModal={setShowModal}
                invitationsInfo={invitationsInfo}
              />
            }
          />
          <Route
            path="/today"
            element={
              <HabitsList
                userId={user.id}
                name={user.name}
                listType={"today"}
                setMessage={setMessage}
                showModal={showModal}
                setShowModal={setShowModal}
                invitationsInfo={invitationsInfo}
              />
            }
          />
          <Route
            path="/create-habit"
            element={<HabitCreation userId={user.id} setMessage={setMessage} />}
          />
          <Route
            path="*"
            element={
              <HabitsList
                userId={user.id}
                name={user.name}
                listType={"all"}
                setMessage={setMessage}
                showModal={showModal}
                setShowModal={setShowModal}
                invitationsInfo={invitationsInfo}
              />
            }
          />
        </Routes>
      )}
    </main>
  );
};

export default App;
