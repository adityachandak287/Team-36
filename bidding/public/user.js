let user = "",
  userdata = {};
let sellers = [];
let socket;
let sellerRoom;
let bidData = [];
let highestBid;
let chatRoom;
// $().ready(() => {
//   $("#sellerDiv").hide();
//   $("#buyerDiv").hide();
//   $("#bidDiv").hide();
//   $("#chatDiv").hide();
//   $("#chooseBuyerTd").hide();
// });
document.getElementById("buyerBtn").addEventListener("click", () => {
  user = "Buyer";
  document.getElementById("sellerBtn").disabled = true;
  document.getElementById("buyerBtn").disabled = true;
  $("#buttonDiv").slideUp();
  $("#buyerDiv").slideDown();
  $("#bidDiv").slideDown();
  connectIO();
});
document.getElementById("sellerBtn").addEventListener("click", () => {
  user = "Seller";
  document.getElementById("sellerBtn").disabled = true;
  document.getElementById("buyerBtn").disabled = true;
  $("#buttonDiv").slideUp();
  $("#formDiv").hide();
  $("#sellerDiv").slideDown();
  $("#bidDiv").slideDown();
  connectIO();
});
document.getElementById("chooseBuyer").addEventListener("click", () => {
  if (socket) {
    socket.emit("buyerChoose", { buyer: highestBid, room: sellerRoom });
  }
});

function connectIO() {
  if (user) {
    socket = io.connect("http://localhost:3001");
    if (user == "Buyer") {
      socket.on("getSellers", data => {
        console.log(data.sellers);
        addSellers(data.sellers, socket);
      });
      socket.on("updateSellers", data => {
        addSellers(data.sellers, socket);
        console.log(data.sellers);
      });
      socket.on("getBids", data => {
        bidData = data;
        makeBidLog();
      });
      document.getElementById("submitBid").addEventListener("click", () => {
        let logData = {
          seller: sellerRoom,
          buyer: socket.id,
          bid: document.getElementById("bidAmount").value
        };
        if (logData.bid != "") {
          bidData.push(logData);
          console.log(logData);
          socket.emit("logBid", { bids: bidData, bid: logData });
          document.getElementById("bidForm").reset();
        }
      });
      socket.on("newBid", data => {
        console.log("New Bid!");
        bidData.push(data.bid);
        addBid(data.bid);
        console.log(data);
      });
      socket.on("saleDone", data => {
        console.log(`Sale done with ${data.seller}`);
        $("#bidLog").slideUp();
        $("#chatDiv").slideDown();
      });
      socket.on("endSession", data => {
        if (socket.id != data.buyer && socket.id != data.seller) {
          console.log(data);
          window.location.href = "http://localhost:3001";
          socket.emit("killMe", sellerRoom);
        }
      });
      socket.on("enterChatMode", data => {
        console.log("CHAT");
        enterChatMode(data);
      });
    } else if (user == "Seller") {
      $("#chooseBuyerTd").fadeIn();
      socket.emit("createSeller", {
        name: "Seller" + Math.trunc(Math.random() * 100)
      });
      socket.on("getBids", data => {
        bidData = data;
        makeBidLog();
      });
      socket.on("newBid", data => {
        console.log("New Bid!");
        bidData.push(data.bid);
        addBid(data.bid);
        console.log(data);
      });
      socket.on("enterChatMode", data => {
        console.log("CHAT");
        enterChatMode(data);
      });
    }
  }
}
function enterChatMode(data) {
  socket.emit("connectMe", data.room);
  chatRoom = data.room;
  $("#bidLog").slideUp();
  $("#formDiv").slideUp();
  $("#buyerDiv").slideUp();
  $("#sellerDiv").slideUp();
  $("#highestBidDiv").slideUp();
  $("#chatDiv").slideDown();
}
function addSellers(sellerData) {
  let sellerDiv = document.getElementById("buyerDiv");
  sellerData.forEach(seller => {
    if (sellers.indexOf(seller) == -1) {
      let p = document.createElement("button");
      p.textContent = seller;
      p.classList.add("btn");
      p.classList.add("btn-warning");
      p.addEventListener("click", () => {
        socket.emit("joinSeller", { seller: seller });
        sellerRoom = seller;
        console.log(seller);
      });
      sellerDiv.appendChild(p);
      sellers.push(seller);
    }
  });
}

function makeBidLog() {
  let myNode = document.getElementById("bidLog");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  document.getElementById("highestBid").textContent = "Highest Bid:";
  if (bidData.length > 0) {
    bidData.forEach(bid => {
      addBid(bid);
    });
  }
}

function addBid(bid) {
  console.log(bid);
  let logDiv = document.getElementById("bidLog");
  let tempDiv = document.createElement("div");
  let tempH = document.createElement("h6");
  tempH.textContent = `${bid.buyer} - Rs. ${bid.bid}`;
  tempDiv.appendChild(tempH);
  tempDiv.classList.add("bg-dark");
  tempDiv.classList.add("text-white");
  tempDiv.classList.add("rounded");
  tempDiv.classList.add("p-1");
  tempDiv.classList.add("m-2");
  logDiv.insertBefore(tempDiv, logDiv.childNodes[0]);
  highestBid = getHighestBid();
  document.getElementById("highestBid").textContent = `Highest Bid: ${
    highestBid.buyer
  } - Rs.${highestBid.bid}`;
}

function getHighestBid() {
  let maxBid = { bid: 0 };
  bidData.forEach(bid => {
    if (bid.bid >= maxBid.bid) {
      maxBid = bid;
    }
  });
  return maxBid;
}
