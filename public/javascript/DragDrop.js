const charactersAPI = new APIHandler('http://localhost:8000');
const containers = {};
let color = 0;
let active = "";

const dragEnter = (e) => {
  // containers[e.target.id] &&
  // e.preventDefault();
  const dragged = document.getElementById(active);
  dragged.parentNode.removeChild(dragged);
  document.getElementById(containers[active]).appendChild(dragged);
};

const allowDrop = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  active = e.target.id;
  containers[active] = containers[active]
    ? containers[active]
    : e.target.parentElement.id;
  // e.dataTransfer.setData("img", active);
};

const drop = (e) => {
  e.preventDefault();
  // const data = e.dataTransfer.getData("img");
  if (e.target.id === "react")
    e.target.appendChild(document.getElementById(active));
  const childs = e.target.childNodes;
  const size = childs.length - 1;
  for (let i = size; i >= 0; i--) {
    const element = document.getElementById(childs[i].id);
    color = 200 - (200 / size) * i;
    document.getElementById(childs[i].id).style.background = `hsl(${
      color + 25
    }, 100%, 50%)`;
  }
};
console.log(getOneRegister())