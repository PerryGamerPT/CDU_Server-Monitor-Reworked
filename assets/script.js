let socket = new WebSocket("wss://statusenrolment.modded.space/minecraftsocket");
let first = true;
socket.onopen = function(e) {};

socket.onmessage = function(event) {
  if(first){
    first = false;
    initializePage(JSON.parse(event.data).minecraft)

    //console.log(initialHTML)
  }else{
    updateServer(event.data)
    //console.log(`Update`);
  }
  //console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error]`);
};
//https://statusenrolment.modded.space/





function initializePage(initalList) {
  let pageStructure ={}
  for(var server in initalList){
    if(pageStructure[initalList[server].hostname] === undefined) pageStructure[initalList[server].hostname] = {}
    pageStructure[initalList[server].hostname][initalList[server].serverPort] = initalList[server]
  }
  let initialHTML = ``;
  for(var hostServer in pageStructure){
    initialHTML+=`<div class="break-inside-avoid bg-white dark:bg-gray-900 rounded-lg p-2 border transition-all duration-300 border-green-200 dark:border-green-900 shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)] dark:shadow-[0_0_15px_-3px_rgba(34,197,94,0.2)]" style="min-height: 120px;"><div class="mb-1.5 px-1 flex justify-between items-center"><h3 class="text-xs font-medium text-gray-700 dark:text-gray-300">${hostServer}</h3></div><div class="grid gap-1.5">`
          for(var server in pageStructure[hostServer]){
            initialHTML+=`<div class="bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden border-gray-200 dark:border-gray-800" id="${pageStructure[hostServer][server].identifier}">
                <div class="flex items-center justify-between px-2 py-1.5 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-opacity-90 bg-green-500" id="${pageStructure[hostServer][server].identifier}_littleCircle"></div>
                    <h2 class="font-medium text-xs truncate">${pageStructure[hostServer][server].identifier.replace(`-${pageStructure[hostServer][server].hostname}`,``)}</h2>
                  </div>
                  <div class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" id="${pageStructure[hostServer][server].identifier}_onlineStatus">Online</div>
                </div>
                <div class="p-1.5 grid grid-cols-3 gap-1.5">
                  <div class="col-span-1">
                    <div class="flex flex-col items-center">
                      <div class="relative w-12 h-12">
                        <svg class="w-full h-full" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" class="text-gray-200 dark:text-gray-800"></path>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" id="${pageStructure[hostServer][server].identifier}_tps_circle" stroke="${(pageStructure[hostServer][server].tps<15)?"#EF4444":(pageStructure[hostServer][server].tps<16)?"#ae8b0c":"#10B981"} " stroke-width="3" stroke-dasharray="${(pageStructure[hostServer][server].tps * 100 / 20)}, 100" class="rotate-[-90deg] origin-center"></path>
                        </svg>
                        <div id="${pageStructure[hostServer][server].identifier}_tps" class="absolute inset-0 flex items-center justify-center text-[13px] font-medium">${ (Math.floor((pageStructure[hostServer][server].tps)*100)/100) }</div>
                      </div>
                      <div class="mt-1 text-center">
                        <div class="text-[13px] font-medium text-gray-700 dark:text-gray-300">TPS</div>
                        <div id="${pageStructure[hostServer][server].identifier}_ms" class="text-[12px] text-gray-500 dark:text-gray-400"> ${ (Math.floor((pageStructure[hostServer][server].mspt)*100)/100) }ms</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-2 grid grid-cols-2 gap-1 text-[10px]">
                    <div class="flex justify-between items-baseline"><span class="text-gray-500 dark:text-gray-400">Players</span><span class="font-medium" id="${pageStructure[hostServer][server].identifier}_players" > ${pageStructure[hostServer][server].playerCount}/${ pageStructure[hostServer][server].maxPlayers} </span></div>
                    <div class="flex justify-between items-baseline"><span class="text-gray-500 dark:text-gray-400">Chunks</span><span class="font-medium" id="${pageStructure[hostServer][server].identifier}_chunks" > ${pageStructure[hostServer][server].chunks} </span></div>
                    <div class="flex justify-between items-baseline"><span class="text-gray-500 dark:text-gray-400">MC</span><span class="font-medium" id="${pageStructure[hostServer][server].identifier}_mcversion" > ${pageStructure[hostServer][server].mcVersion} </span></div>
                    <div class="flex justify-between items-baseline"><span class="text-gray-500 dark:text-gray-400">Entities</span><span class="font-medium" id="${pageStructure[hostServer][server].identifier}_entities" > ${pageStructure[hostServer][server].entities} </span></div>
                    <div class="flex justify-between items-baseline"><span class="text-gray-500 dark:text-gray-400">Quasar v</span><span class="font-medium" id="${pageStructure[hostServer][server].identifier}_quasar" > ${pageStructure[hostServer][server].quasarVersion} </span></div>
                    <div class="flex justify-between items-baseline"><span class="text-gray-500 dark:text-gray-400">Redis</span><span class="font-medium" id="${pageStructure[hostServer][server].identifier}_redis" > ${pageStructure[hostServer][server].redisPing} </span></div>
                  </div>
                </div>
              </div>`
          }
    initialHTML+=`</div></div>`;
  }

  document.querySelector('#mainPage > div').innerHTML = initialHTML;
}

function updateServer(server) {
  let currenttimestamp = new Date().getTime() / 1000;
  server = JSON.parse(server);
  document.querySelector(`#${server.id}_tps`).innerText = (Math.floor((server.data.tps)));
  document.querySelector(`#${server.id}_tps_circle`).setAttribute("stroke", (server.data.tps<15)?"#EF4444":(server.data.tps<16)?"#ae8b0c":"#10B981");
  
  document.querySelector(`#${server.id}_ms`).innerText = (Math.floor((server.data.mspt))) +"ms";
  document.querySelector(`#${server.id}_players`).innerText = server.data.playerCount + "/" + server.data.maxPlayers;
  document.querySelector(`#${server.id}_chunks`).innerText = server.data.chunks;
  document.querySelector(`#${server.id}_mcversion`).innerText = server.data.mcVersion;
  document.querySelector(`#${server.id}_entities`).innerText = server.data.entities;
  document.querySelector(`#${server.id}_quasar`).innerText = server.data.quasarVersion;
  document.querySelector(`#${server.id}_redis`).innerText = server.data.redisPing;
  document.querySelector(`#${server.id}_littleCircle`).setAttribute("class", `w-2 h-2 rounded-full bg-opacity-90 bg-${((currenttimestamp-server.data.last_seen)<120)?"green":"red"}-500`);
  //document.querySelector(`#${server.id}_onlineStatus`).setAttribute("class", `px-1.5 py-0.5 rounded text-[10px] font-medium bg-${((currenttimestamp-server.data.last_seen)<120)?"emerald":"red"}-100 text-emerald-700 dark:bg-${((currenttimestamp-server.data.last_seen)<120)?"emerald":"red"}-900/30 dark:text-${((currenttimestamp-server.data.last_seen)<120)?"emerald":"red"}-400`);
  //document.querySelector(`#${server.id}_onlineStatus`).innerText = ((currenttimestamp-server.data.last_seen)<120)?"Online":`${currenttimestamp-server.data.last_seen}s ago`;
  //document.querySelector('#mainPage > div').innerHTML = initialHTML;
}