import React, { useEffect } from 'react';
import axios from 'axios';

function Authenticated() {
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      window.location.href = window.location.origin;
    } else {
      handleAuthCallback();
    }
  }, []);

  async function handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    const approved = urlParams.get('approved');

    if (requestToken && approved === 'true') {
      await getSessionId(requestToken);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  async function getSessionId(requestToken) {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
        {
          request_token: requestToken,
        }
      );
      const sessionId = response.data.session_id;
      localStorage.setItem('sessionId', sessionId);
      window.location.href = window.location.origin;
    } catch (error) {
      console.error(error);
    }
  }

  return <h1>Logging in...</h1>;
}

export default Authenticated;
