import fetch from "node-fetch";
globalThis.fetch = fetch


async function loadNames() {
    const response = await fetch("http://localhost:8080/vacation/2");
    const names = await response.json();
    return names;
  }

  let teams = await loadNames()

console.log(teams[1][2])