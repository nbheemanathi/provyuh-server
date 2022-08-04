import sgMail from "@sendgrid/mail";

export default (email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "provyuh@gmail.com",
    subject: "Welcome to Provyuh",
    text: "Welcome to Provyuh, Manage your events, Meals, Workouts & To-Do's",
    html: "<strong>Welcome to Provyuh, Manage your events, Meals, Workouts & To-Do's</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
