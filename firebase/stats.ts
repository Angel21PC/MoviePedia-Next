import { auth, db, a } from "./index";

async function ConsultaID() {
  let result = undefined;
  const docRef = db.collection("profile").doc(auth.currentUser.uid);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        result = data.collections_id.id;
        // console.log(result)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  console.log(result);
  return result;
}
export async function getWatchMovies() {
  //date
  //id
  //genero
  let result = undefined;
  const id_user_collection = await ConsultaID();

  const docRef = db.collection("eye_M").doc(id_user_collection);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        result = data;
        // console.log(result)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  console.log(result);
  return result;
}
export async function getGenreStads() {
  //date
  //id
  //genero
  let result = undefined;
  const id_user_collection = await ConsultaID();

  const docRef = db.collection("eye_M").doc(id_user_collection);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        result = data;
        // console.log(result)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  let allGenres = [];
  for (let x = 0; x < result.list.length; x++) {
    for (let i = 0; i < result.list[x].genres.length; i++) {
      allGenres.push(result.list[x].genres[i].name);
    }
  }

  function count() {
    let stats = [];
    allGenres.sort();

    let current = null;
    let cnt = 0;
    for (let i = 0; i < allGenres.length; i++) {
      if (allGenres[i] != current) {
        if (cnt > 0) {
          stats.push({ id: current, label: current, value: cnt, color: "" });
        }
        current = allGenres[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      stats.push({ id: current, label: current, value: cnt, color: "" });
    }

    return stats;
  }

  let stats = count();
  let newResult = {
    labels: [],
    datasets: [
      {
        label: "Genres",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
        ],
        hoverBackgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
        ],
        data: [],
      },
    ],
  };

  for (let x = 0; x < stats.length; x++) {
    newResult.labels.push(stats[x].label);
    newResult.datasets[0].data.push(stats[x].value);
  }
  return newResult;
}

export async function getTimeStatsWeek() {
  let result = undefined;
  const id_user_collection = await ConsultaID();

  const docRef = db.collection("eye_M").doc(id_user_collection);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        result = data;
        // console.log(result)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  function count() {
    let newArrObj = [];

    for (let x = 0; x < result.list.length; x++) {
      let element = result.list[x];
      newArrObj[x] = {
        film: element.title,
        date: element.date,
      };
    }

    return newArrObj;
  }

  let stats = count();

  let newResult = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Terminator",
        pointStyle: "rectRounded",
        backgroundColor: "#6ED3FF",
        barThickness: 40,
        categoryPercentage: 1,
        data: ["1", "2", "3", "4", "5", "6", "7"],
      },
      {
        label: "Avatar",
        backgroundColor: "#1497FF",
        barThickness: 40,
        categoryPercentage: 1,
        pointStyle: "triangle",
        data: ["1"],
      },
    ],
  };
  return newResult;
}

export async function getDateRelease() {
  let result = undefined;
  const id_user_collection = await ConsultaID();

  const docRef = db.collection("eye_M").doc(id_user_collection);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        result = data;
        // console.log(result)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  function count() {
    let newArrObj = [];

    for (let x = 0; x < result.list.length; x++) {
      let element = result.list[x];
      newArrObj[x] = {
        film: element.title,
        release_date: element.release_date,
      };
    }

    return newArrObj;
  }

  let stats = count();

  let orderDate = stats.sort(function (a, b) {
    let aa = a.release_date.split("/").reverse().join(),
      bb = b.release_date.split("/").reverse().join();
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });

  let newResult = {
    labels: [],
    datasets: [
      {
        label: "Genres",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
        ],
        hoverBackgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
        ],
        data: [],
      },
    ],
  };

  function onlyYear(c) {
    let arrayYear = c.split("-");
    return arrayYear[0];
  }

  let year = [];
  for (let x = 0; x < orderDate.length; x++) {
    let c = orderDate[x].release_date;
    let f = onlyYear(c);
    year.push(f);
  }

  function count2() {
    let stats = [];
    year.sort();

    let current = null;
    let cnt = 0;
    for (let i = 0; i < year.length; i++) {
      if (year[i] != current) {
        if (cnt > 0) {
          stats.push({ year: current, value: cnt });
        }
        current = year[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      stats.push({ year: current, value: cnt });
    }

    return stats;
  }

  let arrYear = count2();

  for (let x = 0; x < arrYear.length; x++) {
    newResult.datasets[0].data.push(arrYear[x].value);
    newResult.labels.push(arrYear[x].year);
  }
  return newResult;
}
