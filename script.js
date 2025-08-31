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
	console.log(winId);
	window.style.zIndex = x;

	if (window.dataset.next != "null") {
		console.log('index: '+x+" id: "+winId);
		updateZInd(window.dataset.next, x+1);
	}
	else {
		topWindow = winId;
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

	console.log("top window:"+topWindow);
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
		console.log("changing top window");
		topWindow = previousWindow.id;
		previousWindow.dataset.next = "null";
	}
}

function createWindow() {
	document.querySelectorAll(".new-window").forEach(window => {
		window.classList.remove("new-window");
		window.classList.add("window");
		window.classList.add("active");
		
		$(window).draggable({disabled:false});
		$(window).draggable( "option", "containment", "parent" );
		
		window.id = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
		addToTop(window.id);

		window.addEventListener('mousedown', () => {
			console.log('clicked');
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
			console.log("closed");
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
function createTbIcon () {
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
		tn.classList.remove("new-tnimg");
		tn.classList.add("tnimg");
		tn.dataset.forwinid = winId;
		
	    tn.addEventListener('click', () => {
			deleteWin(winId);
			addToTop(winId);
			if (!window.classList.contains("active")) {
				window.classList.add("active");
			}
	    });
	});
}

$( function() {
    $( ".draggable" ).draggable({disabled:false});
    $( ".draggable" ).draggable( "option", "containment", "parent" );
	$( ".draggable" ).draggable( "option", "grid", [ 72, 96 ] );
} );

function createAboutPg () {
	screen = document.getElementById("screen");
    screen.insertAdjacentHTML('beforeend', 
      `
      <div class="new-window" data-tbtag="about">
          <div class="title-bar">
              <div class="title-bar-text">Welcome</div>
              <div class="title-bar-controls">
                  <button aria-label="Any Text" class="new-minimize"></button>
                  <button aria-label="Any Text" class="new-maximize"></button>
                  <button aria-label="Any Text" class="new-close"></button>
              </div>
          </div>
		  <div class="window-body">
			<embed src="about.html">
		  </div>
      </div>
      `
    );
	
	if (taskbar.querySelector("#taskbar-about") == null) {
		taskbar.insertAdjacentHTML('beforeend',
			`
			<li id="taskbar-about" class="tb-icon-wrapper">
				<ul class="thumbnail thumbnail-about">
					<li class="new-tnimg">
						<img style="margin: auto" src="assets/tom-face-cropped.jpg"></img>
					</li>
				</ul>
				<img class="tb-icon" src="assets/tom-face-cropped.jpg"></img>
			</li>
			`
		);
		document.getElementById("taskbar-about").dataset.count = 1;
	} else {
		tnaccomplishments = document.getElementById('taskbar-about').querySelector('.thumbnail-about');
		tnaccomplishments.insertAdjacentHTML('beforeend',
			`<li class="new-tnimg">
				<img style="margin: auto" src="assets/tom-face-cropped.jpg"></img>
			</li>`
		);
		document.getElementById("taskbar-about").dataset.count = parseInt(document.getElementById("taskbar-about").dataset.count) + 1;
	}
	createWindow();
}


// create the link buttons
document.querySelectorAll('.shortcut-sailing').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
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
	
	if (taskbar.querySelector("#taskbar-sailing") == null) {
		taskbar.insertAdjacentHTML('beforeend',
			`
			<li id="taskbar-sailing" class="tb-icon-wrapper">
				<ul class="thumbnail thumbnail-sailing">
					<li class="new-tnimg">
						<img style="margin: auto" src="assets/sailing-icon.png"></img>
					</li>
				</ul>
				<img class="tb-icon" src="assets/sailing-icon.png"></img>
			</li>
			`
		);
		document.getElementById("taskbar-sailing").dataset.count = 1;
	} else {
		tnsailing = document.getElementById('taskbar-sailing').querySelector('.thumbnail-sailing');
		tnsailing.insertAdjacentHTML('beforeend',
			`<li class="new-tnimg">
				<img style="margin: auto" src="assets/sailing-icon.png"></img>
			</li>`
		);
		document.getElementById("taskbar-sailing").dataset.count = parseInt(document.getElementById("taskbar-sailing").dataset.count) + 1;
	}
	createWindow();
  });
});

document.querySelectorAll('.shortcut-music').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
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
      </div>
      `
    );

	if (taskbar.querySelector("#taskbar-music") == null) {
		taskbar.insertAdjacentHTML('beforeend',
			`
			<li id="taskbar-music" class="tb-icon-wrapper">
				<ul class="thumbnail thumbnail-music">
					<li class="new-tnimg">
						<img style="margin: auto" src="assets/music-icon.png"></img>
					</li>
				</ul>
				<img class="tb-icon" src="assets/music-icon.png"></img>
			</li>
			`
		);
		document.getElementById("taskbar-music").dataset.count = 1;
	} else {
		tnmusic = document.getElementById('taskbar-music').querySelector('.thumbnail-music');
		tnmusic.insertAdjacentHTML('beforeend',
			`<li class="new-tnimg">
				<img style="margin: auto" src="assets/music-icon.png"></img>
			</li>`
		);
		document.getElementById("taskbar-music").dataset.count = parseInt(document.getElementById("taskbar-music").dataset.count) + 1;
	}
	createWindow();
  });
});

document.querySelectorAll('.shortcut-accomplishments').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
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
	
	if (taskbar.querySelector("#taskbar-accomplishments") == null) {
		taskbar.insertAdjacentHTML('beforeend',
			`
			<li id="taskbar-accomplishments" class="tb-icon-wrapper">
				<ul class="thumbnail thumbnail-accomplishments">
					<li class="new-tnimg">
						<img style="margin: auto" src="assets/accomplishments-icon.png"></img>
					</li>
				</ul>
				<img class="tb-icon" src="assets/accomplishments-icon.png"></img>
			</li>
			`
		);
		document.getElementById("taskbar-accomplishments").dataset.count = 1;
	} else {
		tnaccomplishments = document.getElementById('taskbar-accomplishments').querySelector('.thumbnail-accomplishments');
		tnaccomplishments.insertAdjacentHTML('beforeend',
			`<li class="new-tnimg">
				<img style="margin: auto" src="assets/accomplishments-icon.png"></img>
			</li>`
		);
		document.getElementById("taskbar-accomplishments").dataset.count = parseInt(document.getElementById("taskbar-accomplishments").dataset.count) + 1;
	}
	createWindow();
  });
});

document.querySelectorAll('.shortcut-about').forEach(shortcut => {
  shortcut.addEventListener('dblclick', () => {
    createAboutPg();
  });
});

setClock
setInterval(setClock, 1000);
createAboutPg();