function OpenLeftSideBar() {
  document.getElementById("Left-SideBar").style.width = "400px";
  document.getElementById("left-link-div").style.visibility = "visible";
}

function CloseLeftSideBar() {
  document.getElementById("Left-SideBar").style.width = "0px";
  document.getElementById("left-link-div").style.visibility = "hidden";
}

function OpenRightSideBar() {
  document.getElementById("Right-SideBar").style.width = "400px";
  document.getElementById("right-link-div").style.visibility = "visible";
}

function CloseRightSideBar() {
  document.getElementById("Right-SideBar").style.width = "0px";
  document.getElementById("right-link-div").style.visibility = "hidden";
}

function OpenEuclid() {
  window.open("/GraphingPage(1)/EuclidMap.html", "__self");
}
