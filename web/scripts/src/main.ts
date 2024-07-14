import Room from "./views/room.js";

window.onload = async () => {
  const currentView = new Room();
  await currentView.show();
};
