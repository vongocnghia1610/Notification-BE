const db = require("../../config/firebase/firebase");
const { google } = require("googleapis");
const admin = require("firebase-admin");

class notificationController {
  async notify(req, res, next) {
    const doc = db.collection("notifications");

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        clearInterval();

        let a = setInterval(function () {
          docSnapshot.forEach((doc) => {
            // console.log(`Received doc snapshot: ${doc.id}`);
            var date = new Date(doc.data().date["_seconds"] * 1000);
            // console.log(`Received doc snapshot: ${date}`);
            var date1 = new Date();
            // console.log(date1.toString());
            if (date1.toString() == date.toString()) {
              var token;
              console.log("trung ne");
              console.log(doc.data().userId);
              var gettoken =  db
                .collection("users")
                .where('uid', '==', 'D3brtdIX3IMCM6lxlFurfmfNQD52')
                .onSnapshot((querySnapshot ) => {
                  querySnapshot.forEach((doc) =>{
                    token=doc.data().fcmToken;
                  });
                  sendNotification(
                    doc.data().title,
                    doc.data().body,
                    doc.data().image,
                    token
                  );
                });
             
            }
          });
        }, 1000);
        //   res.status(200).send({
        //     data: docSnapshot.docs[0].data(),});

        // ...
      },

      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }
}
module.exports = new notificationController();

function sendNotification(title, body, image, tokenne) {
  const payload = {
    notification: {
      title: title,
      body: body,
      image: image,
      click_action: "FLUTTER_NOTIFICATION_CLICK",
    },
    data: {
      title: "lambiengcode",
      tu: "vinh ne",
      route: "home",
    },
    // android: {
    //   notification: {
    //     channel_id: "cnid",
    //   },
    // },
    // apns: {
    //   payload: {
    //     aps: {
    //       "mutable-content": 1,
    //     },
    //   },
    //   fcm_options: {
    //     image: "https://foo.bar.pizza-monster.png",
    //   },
    // },
    // webpush: {
    //   headers: {
    //     image: "https://foo.bar.pizza-monster.png",
    //   },
    // },
    // token: tokenne,
  };
  admin
    .messaging()
    .sendToDevice(tokenne, payload)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.error("Error sending message:", error);
    });
}
