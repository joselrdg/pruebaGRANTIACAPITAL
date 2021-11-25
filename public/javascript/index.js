const boxAPI = new APIHandler("http://localhost:3000");
const elementsToCreate = 4;
const containers = {};
let color = 0;
let active = "";

window.addEventListener("load", () => {
  boxAPI
    .getFullList()
    .then((res) => {
      const data = res.data;
      data[0] ? createSavedItems(data) : createItensInBd(elementsToCreate);
    })
    .catch((err) => {
      alert("Not found");
      console.error(err);
    });
});

const createDiv = (elementId, boxId, color = "aqua") => {
  let div = document.createElement("div");
  div.id = boxId;
  div.innerHTML = `<div
id="${elementId}"
draggable="true"
ondragstart="drag(event)"
ondragenter="dragEnter(event)"
class="pointer _p_1 _m_1 _br_5 _d_f _jc_c _ai_c"
style="
  min-width: 100px;
  min-height: 100px;
  background: ${color};
"
><p class="pointer">${elementId}</p></div>`;
  return div;
};

// Crea los elementos cuando hay en la bs
const createSavedItems = (data) => {
  const dropContainer = document.getElementById("dropContainer");
  data.forEach((element) => {
    containers[element.id] = element.box;
    const container = document.getElementById(element.container);
    container.appendChild(createDiv(element.id, element.box, element.color));
    if (element.drop) {
      const dragged = document.getElementById(element.id);
      dragged.parentNode.removeChild(dragged);
      dropContainer.appendChild(dragged);
    }
  });
  handleColor();
};

// Crea los elementos y llena la bs, se necesita volver a lanzar el servidor-No medio tiempo a mirarlo
const createItensInBd = async (elementsCreated) => {
  const newItems = [];
  const divContainers = document.querySelectorAll(".container");
  divContainers.forEach((container, i) => {
    for (let index = 0; index < elementsCreated; index++) {
      const elementId = `div${i}_${index}`;
      const boxId = `cont${i}box${index}_div${index}`;
      containers[elementId] = boxId;
      const div = createDiv(elementId, boxId);
      //Almacene los datos para la bs
      newItems.push({
        id: elementId,
        container: container.id,
        box: boxId,
        drop: false,
      });
      container.appendChild(div);
    }
  });
  boxAPI
    .createOneRegister(newItems)
    .then((res) => {
      console.log("Created elements");
    })
    .catch((err) => console.error(err));
};

const UpdateDatabase = (id, data) => {
  boxAPI.updateOneRegister(id, data).then((res) => {
    console.log("Updated database");
  });
};

const handleColor = () => {
  const divDrop = document.getElementById("dropContainer");
  const childs = divDrop.childNodes;
  const size = childs.length - 1;
  for (let i = size; i >= 0; i--) {
    color = 200 - (200 / size) * i;
    color = Number.isNaN(color) ? 0 : color;
    document.getElementById(childs[i].id).style.background = `hsl(${
      color + 25
    }, 100%, 50%)`;
  }
};

const dragEnter = (e) => {
  const dragged = document.getElementById(active);
  dragged.parentNode.removeChild(dragged);
  dragged.style.background = "aqua";
  const divBox = document.getElementById(containers[active]);
  divBox.appendChild(dragged);
  handleColor();
  UpdateDatabase(active, {
    id: active,
    container: divBox.parentNode.id,
    box: containers[active],
    drop: false,
    color: "aqua",
  });
};

const allowDrop = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  active = e.target.id;
};

const drop = (e) => {
  e.preventDefault();
  if (e.target.id === "dropContainer") {
    const parentContainer = document.getElementById(containers[active])
      .parentNode.id;
    e.target.appendChild(document.getElementById(active));
    handleColor();
    UpdateDatabase(active, {
      id: active,
      container: parentContainer,
      box: containers[active],
      drop: true,
      color: `hsl(${color + 25}, 100%, 50%)`,
    });
  }
};
