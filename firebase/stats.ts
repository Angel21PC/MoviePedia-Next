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
// export async function getWatchMovies() {
//   //date
//   //id
//   //genero
//   let result = undefined;
//   const id_user_collection = await ConsultaID();

//   const docRef = db.collection("eye_M").doc(id_user_collection);
//   await docRef
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         const data = doc.data();
//         result = data;
//         // console.log(result)
//       } else {
//         console.log("No such document!");
//       }
//     })
//     .catch((error) => {
//       console.log("Error getting document:", error);
//     });
//   console.log(result);
//   return result;
// }
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

export async function getTimeStatsYear() {
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
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Movies Year",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  function countMonth(obj) {
    let monthCountArr = new Array(12).fill(0);
    obj.forEach(({ date }) => (monthCountArr[date.toDate().getMonth()] += 1));
    return monthCountArr;
  }
  let p = countMonth(stats);
  newResult.datasets[0].data = p;
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
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Movies Week",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }

  function getMovieWeek() {
    let movieWeek = [];
    for (let i = 0; i < stats.length; i++) {
      let data = stats[i].date;
      let result = getWeekNumber(data.toDate());
      let result2 = getWeekNumber(new Date());
      if (result[0] === result2[0] && result[1] === result2[1]) {
        movieWeek.push(stats[i]);
      }
    }
    return movieWeek;
  }
  let p = getMovieWeek();
  function countMonth(obj) {
    let monthCountArr = new Array(7).fill(0);
    obj.forEach(({ date }) => (monthCountArr[date.toDate().getDay() - 1] += 1));
    return monthCountArr;
  }
  let pa = countMonth(p);
  newResult.datasets[0].data = pa;
  return newResult;
}
