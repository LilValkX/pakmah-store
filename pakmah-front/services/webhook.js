import axios from "axios";

export const sendwebhook = (content) => {
  axios.post(
    "https://discord.com/api/webhooks/966350029566648320/xBL7J0clHPVaXuu42LCFDOOkkEW-8Qr5q1F34M8fV73-CHhN59v27uVPdwuOTmd7qSz3",
    { content }
  );
};
