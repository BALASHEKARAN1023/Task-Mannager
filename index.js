let data = [
    {
      task: "Meeting",
      dis: "Client Meeting",
      dur: "00.23.02",
    },
    {
      task: "Project abc",
      dis: "Development-xyz",
      dur: "00.23.02",
    },
    {
      task: "Personal Break",
      dis: " - ",
      dur: "00.23.02",
    },
    {
      task: "Meeting",
      dis: "Client Meeting",
      dur: "00.23.02",
    },
    {
      task: "Project abc",
      dis: "Development-xyz",
      dur: "00.23.02",
    },
    {
      task: "Personal Break",
      dis: " -",
      dur: "00.23.02",
    },
  ];
  
  let tab = document.getElementById("tab");
  let dyn = (dataArray) => {
    dataArray.map((da) => {
      let row = tab.insertRow();
      let buttonDel = document.createElement("button");
      let textDel = document.createTextNode("Delete");
      buttonDel.appendChild(textDel);
      buttonDel.style.backgroundColor = "red";
      let buttonUpdate = document.createElement("button");
      let text = document.createTextNode("Update");
      buttonUpdate.appendChild(text);
      buttonUpdate.style.backgroundColor = "green";
      Object.values(da).forEach((val) => {
        let m = row.insertCell();
        m.textContent = val;
      });
      let m = row.insertCell();
      m.appendChild(buttonDel);
      m.appendChild(buttonUpdate);
      buttonDel.addEventListener("click", () => {
        row.remove();
      });
      buttonUpdate.addEventListener("click", () => {
        let cells = row.cells;
        for (let i = 0; i < cells.length - 1; i++) {
          dataArray[dataArray.indexOf(da)][i] = cells[i].textContent; // Update data array
        }
          //  row.style.backgroundColor = "green";
      });
    });
  };
  dyn(data);
  
  let filter = (dataList) => {
    //select data
    let t = document.getElementById("sel");
    let t1 = t.value;
    let fida = dataList.filter((val) => val.task == t1);
    // table data
    const rows = tab.getElementsByTagName("tr");
    Array.from(rows).forEach((row, index) => {
      console.log(index);
      if (index !== 0) {
        // Skip header row
        let td = row.getElementsByTagName("td")[0]; // Assuming the first column contains the task name
        if (td) {
          let valt = td.textContent || td.innerText;
          if (fida.some((item) => item.task === valt)) {
            row.style.display="";         
          } else {
            row.style.display= "none";
          }
        }
      }
    });
  };
  
  // Add event listener to detect changes in select element
  let filbutton = () => {
    // document.getElementById("sel").addEventListener("change", filter);
    filter(data);
  };
  
  let du=0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  isRunning = false;
  function StartStop() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
          minutes++;
          seconds = 0;
          if (minutes >= 60) {
            hours++;
            minutes = 0;
          }
        }
  let formattedTime = `${hours.toString().padStart(2, "0")}: ${minutes .toString() .padStart(2, "0")}:  ${seconds.toString().padStart(2, "0")}`;
        du=formattedTime;
       document.getElementById("stopwatch").innerText = formattedTime;
        document.getElementById("startstop").innerText = "Stop";
      }, 1000);
    } else {
      document.getElementById("startstop").innerHTML = "Start";
      clearInterval(timer);
      isRunning = false;
    }
  }
  function Reset() {
    seconds = 0;
    hours = 0;
    minutes = 0;
    let formattedTime = `${hours.toString().padStart(2, "0")}: ${minutes
      .toString()
      .padStart(2, "0")}: ${seconds.toString().padStart(2, "0")}`;
    document.getElementById("stopwatch").innerText = formattedTime;
  }
   
  
  let fromdata =document.getElementById("forms");
  
  fromdata.addEventListener("submit", (e) => {
    e.preventDefault();
    let task = document.getElementById("task");
    let description = document.getElementById("description");
    let obj={
      task:task.value,
      description:description.value,
      time:du
    }
     data.push(obj);
     dyn([obj]);
     task.value="";
     description.value="";
     du="";
  
  })