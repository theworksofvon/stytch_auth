import { useEffect } from "react";
import { useStytch, useStytchSession } from "@stytch/stytch-react";
import { useNavigate } from "react-router-dom";

export default () => {
  const client = useStytch();
  const session = useStytchSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/account");
    } else {
      const token = new URLSearchParams(window.location.search).get("token");

      client.magicLinks
        .authenticate(token, {
          session_duration_minutes: 1000,
        })
        .then(() => {
          alert("Successfully authenticated");
          navigate(0);
        });
    }
  }, [client, session]);

  return (
    <>
      <h1>Loading...</h1>
      <p>Please wait while we authenticate your token.</p>
    </>
  );
};
