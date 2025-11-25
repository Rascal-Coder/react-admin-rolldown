import Icon from "./components/icon/icon";

function App() {
  console.log("xxxxxxx");

  return (
    <div>
      <Icon icon="local:file-ai" />
      <Icon icon="material-symbols:10k" size={100} />
      <Icon icon="material-symbols:3d-rotation-rounded" size={100} />
    </div>
  );
}

export default App;
