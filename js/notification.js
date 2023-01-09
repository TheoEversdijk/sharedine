// const notificationAPI = "http://127.0.0.1:3005";

// async function getRegistrationEmail(email, appointment) {
//     const response = await fetch(`${notificationAPI}/register?email=${email}&appointment=${appointment.name}
//                                   &date=${appointment.date}&location=${appointment.location}&time=${appointment.time}`, {
//         method: 'GET',
//       });
//     return response;
// }

// async function getCancelationEmail(email, appointment) {
//   const response = await fetch(`${notificationAPI}/remove?email=${email}&appointment=${appointment.name}
//                                 &date=${appointment.date}&location=${appointment.location}&time=${appointment.time}`, {
//       method: 'GET',
//     });
//   return response;
// }

// async function getEditEmail(email, appointment) {
//   const response = await fetch(`${notificationAPI}/edit?email=${email}&appointment=${appointment.name}
//                                 &date=${appointment.date}&location=${appointment.location}&time=${appointment.time}`, {
//       method: 'GET',
//     });
//   return response;
// }