const time = document.getElementById('time');
const date = document.getElementById('date');
const taskbar = document.getElementById('taskbar');

var topWindow = "list-head";

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function openNav() {
  const targetWindow = document.getElementById("nav")
  targetWindow.style.display = 'block';
  setTimeout(() => {
  targetWindow.classList.add('active');
  }, 50);
}

function setClock() {
  var d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  let day = addZero(d.getDate());
  let month = addZero(d.getMonth()+1); //month seems to be off?
  let year = d.getFullYear();
  let currentTime = h + ":" + m + ":" + s;
  let currentDate = day + "/" + month + "/" + year;
  time.innerHTML=currentTime;
  date.innerHTML=currentDate;
}

function updateZInd(winId, x) {
	const window = document.getElementById(winId);
	window.style.zIndex = x;

	if (window.dataset.next != "null") {
		updateZInd(window.dataset.next, x+1);
	}
	else {
		topWindow = winId;

		console.log(topWindow);
		console.log(document.getElementById(topWindow).style.zIndex)
	}
}

function addToTop(winId) {
	const window = document.getElementById(winId);
	const previousWindow = document.getElementById(topWindow);

	window.dataset.prev = topWindow;
	window.dataset.next = "null";
	window.style.zIndex = parseInt(previousWindow.style.zIndex) + 1;

	previousWindow.dataset.next = winId;
	topWindow = winId;

	console.log(topWindow);
	console.log(document.getElementById(topWindow).style.zIndex)
}

function deleteWin(winId) {
	const window = document.getElementById(winId);
	const previousWindow = document.getElementById(window.dataset.prev);
	const nextWindow = document.getElementById(window.dataset.next);

	if (winId!=topWindow) {
		nextWindow.dataset.prev = previousWindow.id;
		updateZInd(nextWindow.id, parseInt(window.style.zIndex));
	}
	else {
		topWindow = previousWindow.id;
		previousWindow.dataset.next = "null";
		console.log(topWindow);
		console.log(document.getElementById(topWindow).style.zIndex)
	}
}

function createWindow() {
	document.querySelectorAll(".new-window").forEach(window => {
		window.classList.remove("new-window");
		window.classList.add("window");
		window.classList.add("active");
		
		$(window).draggable({disabled:false});
		$(window).draggable( "option", "containment", "parent" );
		
		if(!window.hasAttribute("id")){ window.id = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36); }
		addToTop(window.id);

		window.addEventListener('mousedown', () => {
			deleteWin(window.id);
		    addToTop(window.id);
		});

		createTn(window.id);
	});
	document.querySelectorAll(".new-close").forEach(closebutton => {
		const window = closebutton.parentNode.parentNode.parentNode;
		var tbtag = "#taskbar-"+window.dataset.tbtag;
		var tntag = "[data-forwinid="+window.id+"]";
		
		closebutton.classList.remove("new-close");
		closebutton.classList.add("close");
		
		closebutton.addEventListener('click', () => {
			deleteWin(window.id);
			window.remove();		

		    taskbarIcon = taskbar.querySelector(tbtag);
		    if (taskbarIcon.dataset.count > 1) {
			    taskbarIcon.dataset.count -= 1;
				thumbnailIcon = taskbar.querySelector(tntag);
				thumbnailIcon.remove();
			} else {
				taskbarIcon.remove();
			}
		});
	});
	document.querySelectorAll(".new-maximize").forEach(maxButton => {
		maxButton.classList.remove("new-maximize");
		maxButton.classList.add("maximize");
		
		maxButton.addEventListener('click', () => {

		  const window = maxButton.parentNode.parentNode.parentNode;

		  // toggle the appearance of the button from 'maximise' to 'restore'
		  maxButton.classList.toggle('restore');
		  maxButton.classList.toggle('maximize');
		  // toggle fullscreen appearance
		  window.classList.toggle('fullscreen');

		  if (window.classList.contains("fullscreen")) {
			const rect = window.getBoundingClientRect();
			window.dataset.locy = rect.y;
			window.dataset.locx = rect.x;
			$(window).draggable({disabled:true});
			window.style.top = 0;
			window.style.left = 0;
		  } else {
			$(window).draggable({disabled:false});
			window.style.top = window.dataset.locy+"px";
			window.style.left = window.dataset.locx+"px";
		  }
		});
	});
	document.querySelectorAll(".new-minimize").forEach(minButton => {
		minButton.classList.remove("new-minimize");
		minButton.classList.add("minimize");
		
	    minButton.addEventListener('click', () => {
			const window = minButton.parentNode.parentNode.parentNode;
			window.classList.remove('active'); 
	    });
	});
}

// create functionality for taskbar icons
function createTbIcon() {
	document.querySelectorAll(".new-tb-icon").forEach(tbIcon => {
		tbIcon.classList.remove("new-tb-icon");
		tbIcon.classList.add("tb-icon");
		
	    tbIcon.addEventListener('click', () => {
			if (tbIcon.dataset.count == 1) {
				
			}
	    });
	});
}

function createTn (winId) {
	const window = document.getElementById(winId);

	document.querySelectorAll(".new-tnimg").forEach(tn => {
		const img = tn.firstElementChild;

		tn.classList.remove("new-tnimg");
		tn.classList.add("tnimg");
		tn.dataset.forwinid = winId;
		html2canvas(document.getElementById(winId)).then(
			canvas => {
				img.src = canvas.toDataURL("image/png");
			}
		);
		
	    tn.addEventListener('click', () => {
			deleteWin(winId);
			addToTop(winId);
			if (!window.classList.contains("active")) {
				window.classList.add("active");
			}
	    });
	});
	// https://api.apiflash.com/v1/urltoimage?access_key=df75cefd72b7407e96f4ff077e8316bc&url=https%3A%2F%2Fsvtstickypiston.github.io%2FtbOS%2Fprojects&width=434&height=324
}

$( function() {
    $( ".draggable" ).draggable({disabled:false});
    $( ".draggable" ).draggable( "option", "containment", "parent" );
	$( ".draggable" ).draggable( "option", "grid", [ 72, 96 ] );
} );

function openStart() {
	deleteWin("start");
	addToTop("start");

	const window=document.getElementById("start");
	if (!window.classList.contains("active")) {
		window.classList.add("active");
	}
}

function createTaskbar(tbtag) {
	if (taskbar.querySelector("#taskbar-" + tbtag) == null) {
		taskbar.insertAdjacentHTML('beforeend',
			`
			<li id="taskbar-${tbtag}" class="tb-icon-wrapper">
				<ul class="thumbnail thumbnail-${tbtag}">
					<li class="new-tnimg">
						<img style="margin: auto" src="assets/${tbtag}-icon.png"></img>
					</li>
				</ul>
				<img class="tb-icon" src="assets/${tbtag}-icon.png"></img>
			</li>
			`
		);
		document.getElementById("taskbar-" + tbtag).dataset.count = 1;
	} else {
		tnsailing = document.getElementById('taskbar-' + tbtag).querySelector('.thumbnail-' + tbtag);
		tnsailing.insertAdjacentHTML('beforeend',
			`<li class="new-tnimg">
				<img style="margin: auto" src="assets/${tbtag}-icon.png"></img>
			</li>`
		);
		document.getElementById("taskbar-" + tbtag).dataset.count = parseInt(document.getElementById("taskbar-" + tbtag).dataset.count) + 1;
	}
}

function sailingWindow() {
	screen = document.getElementById("screen");
    screen.insertAdjacentHTML('beforeend', 
      `
      <div class="new-window" data-tbtag="sailing">
          <div class="title-bar">
              <div class="title-bar-text">Sailing</div>
              <div class="title-bar-controls">
                  <button aria-label="Any Text" class="new-minimize"></button>
                  <button aria-label="Any Text" class="new-maximize"></button>
                  <button aria-label="Any Text" class="new-close"></button>
              </div>
          </div>
		  <div class="window-body">
			<embed src="sailing.html">
		  </div>
      </div>
      `
    );
	
	createTaskbar("sailing");
	createWindow();
}

function musicWindow() {
	screen = document.getElementById("screen");
    screen.insertAdjacentHTML('beforeend', 
      `
      <div class="new-window" data-tbtag="music">
          <div class="title-bar">
              <div class="title-bar-text">Music</div>
              <div class="title-bar-controls">
                  <button aria-label="Any Text" class="new-minimize"></button>
                  <button aria-label="Any Text" class="new-maximize"></button>
                  <button aria-label="Any Text" class="new-close"></button>
              </div>
          </div>
		  <div class="window-body">
			<embed src="music.html">
		  </div>
      </div>
      `
    );

	createTaskbar("music");
	createWindow();
}

function accomplishmentsWindow() {
	screen = document.getElementById("screen");
    screen.insertAdjacentHTML('beforeend', 
      `
      <div class="new-window" data-tbtag="accomplishments">
          <div class="title-bar">
              <div class="title-bar-text">Accomplishments</div>
              <div class="title-bar-controls">
                  <button aria-label="Any Text" class="new-minimize"></button>
                  <button aria-label="Any Text" class="new-maximize"></button>
                  <button aria-label="Any Text" class="new-close"></button>
              </div>
          </div>
		  <div class="window-body">
			<embed src="accomplishments.html">
		  </div>
      </div>
      `
    );
	
	createTaskbar("accomplishments");
	createWindow();
}

function projectsWindow() {
	screen = document.getElementById("screen");
    screen.insertAdjacentHTML('beforeend', 
      `
      <div class="new-window" data-tbtag="projects">
          <div class="title-bar">
              <div class="title-bar-text">Projects</div>
              <div class="title-bar-controls">
                  <button aria-label="Any Text" class="new-minimize"></button>
                  <button aria-label="Any Text" class="new-maximize"></button>
                  <button aria-label="Any Text" class="new-close"></button>
              </div>
          </div>
		  <div class="window-body">
			<embed src="projects.html">
		  </div>
      </div>
      `
    );
	
	createTaskbar("projects");
	createWindow();
}

function workWindow() {
	screen = document.getElementById("screen");
    screen.insertAdjacentHTML('beforeend', 
      `
      <div class="new-window" data-tbtag="work">
          <div class="title-bar">
              <div class="title-bar-text">Work</div>
              <div class="title-bar-controls">
                  <button aria-label="Any Text" class="new-minimize"></button>
                  <button aria-label="Any Text" class="new-maximize"></button>
                  <button aria-label="Any Text" class="new-close"></button>
              </div>
          </div>
		  <div class="window-body">
			<embed src="work.html">
		  </div>
      </div>
      `
    );
	
	createTaskbar("work");
	createWindow();
}

function clearScreen() {
	document.querySelectorAll('.window').forEach(window => {
	  window.classList.remove('active');
	});
}

// create the link buttons
document.querySelectorAll('.shortcut-sailing').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
    sailingWindow();
  });
});

document.querySelectorAll('.shortcut-music').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
    musicWindow();
  });
});

document.querySelectorAll('.shortcut-accomplishments').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
    accomplishmentsWindow();
  });
});

document.querySelectorAll('.shortcut-projects').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
    projectsWindow();
  });
});

document.querySelectorAll('.shortcut-work').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
    workWindow();
  });
});

document.querySelectorAll('.shortcut-about').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
    createAboutPg();
  });
});

setClock
setInterval(setClock, 1000);
createWindow();