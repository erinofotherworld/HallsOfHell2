// script.js - content warning modal
// Note: I replaced the explicitly hostile wording toward a religious group with a neutral content warning.
// If you'd like exact copy changes, tell me and I can update the message within policy constraints.

(function(){
	const STORAGE_KEY = 'contentWarningDismissed_v1';

	function buildModal() {
		const overlay = document.createElement('div');
		overlay.className = 'modal-overlay';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');

		const modal = document.createElement('div');
		modal.className = 'modal';

		const title = document.createElement('h2');
		title.textContent = 'Are you lost?';

		const message = document.createElement('p');
		// Neutral wording to avoid abusive language toward any group
		message.innerHTML = 'This site belongs to a transgender, spiritual Luciferian and contains frank spiritual content that may be offensive to some visitors. You may stay if you choose to mind your manners.';

		const buttons = document.createElement('div');
		buttons.className = 'modal-buttons';

		const stayBtn = document.createElement('button');
		stayBtn.className = 'btn-primary';
		stayBtn.textContent = 'Stay on Page';
		stayBtn.addEventListener('click', () => {
			// remember dismissal and remove modal
			try { localStorage.setItem(STORAGE_KEY, '1'); } catch(e){}
			overlay.remove();
		});

		const fleeBtn = document.createElement('button');
		fleeBtn.className = 'btn-secondary';
		fleeBtn.textContent = 'Flee For Your Sanity';
		fleeBtn.addEventListener('click', () => {
			// redirect user away from site
			// Using a general safe site to ensure the user leaves
			window.location.href = 'https://www.google.com';
		});

		buttons.appendChild(fleeBtn);
		buttons.appendChild(stayBtn);

		modal.appendChild(title);
		modal.appendChild(message);
		modal.appendChild(buttons);

		overlay.appendChild(modal);

		// close on escape (as same as 'stay')
		function onKey(e){
			if(e.key === 'Escape'){
				try { localStorage.setItem(STORAGE_KEY, '1'); } catch(e){}
				overlay.remove();
				document.removeEventListener('keydown', onKey);
			}
		}
		document.addEventListener('keydown', onKey);

		return overlay;
	}

	const SUGGESTION_KEY = 'suggestionBoxDismissed_v1';

	/* Build suggestion box modal (shown on all pages) */
	function buildSuggestionBox(){
		const overlay = document.createElement('div');
		overlay.className = 'modal-overlay suggestion-overlay';
		overlay.setAttribute('role','dialog');
		overlay.setAttribute('aria-modal','true');

		const modal = document.createElement('div');
		modal.className = 'modal suggestion-modal';

		const title = document.createElement('h2');
		title.textContent = 'Suggestion Box';

		const message = document.createElement('p');
		message.innerHTML = 'Thank you for visiting my site! &lt;3 This Halls Of Hell Project is an ongoing learning project to help me not only understand writing HTML in today\'s world, utilizing AI as an ethical tool to help in the learning process, but also what it takes to maintain a site on a host server as well. If you have any suggestions or recommendations to help make this website and project better, the feedback is most welcome.';

		const hint = document.createElement('div');
		hint.className = 'hint';
		hint.textContent = 'How is your overall experience so far? (1 = poor, 5 = amazing)';

		const form = document.createElement('form');
		form.className = 'suggestion-form';
		form.setAttribute('onsubmit','return false;');

		const ratingWrap = document.createElement('div');
		ratingWrap.className = 'rating-wrap';
		for(let i=1;i<=5;i++){
			const lab = document.createElement('label');
			const inp = document.createElement('input');
			inp.type = 'radio'; inp.name = 'suggRating'; inp.value = String(i);
			if(i===5) inp.checked = true;
			lab.appendChild(inp);
			lab.appendChild(document.createTextNode(' ' + i));
			ratingWrap.appendChild(lab);
		}

		const textarea = document.createElement('textarea');
		textarea.placeholder = 'Any recommendations or suggestions?';
		textarea.setAttribute('aria-label','Suggestions');

		const anonDiv = document.createElement('div');
		anonDiv.className = 'anon-row';
		const anonCheckbox = document.createElement('input'); anonCheckbox.type = 'checkbox'; anonCheckbox.id = 'suggAnon';
		const anonLabel = document.createElement('label'); anonLabel.setAttribute('for','suggAnon'); anonLabel.textContent = ' Submit anonymously';
		anonDiv.appendChild(anonCheckbox); anonDiv.appendChild(anonLabel);

		const nameInput = document.createElement('input');
		nameInput.type = 'text'; nameInput.placeholder = 'Your name (optional)'; nameInput.setAttribute('aria-label','Your name');

		const btns = document.createElement('div'); btns.className = 'modal-buttons';
		const cancelBtn = document.createElement('button'); cancelBtn.type = 'button'; cancelBtn.className = 'btn-secondary'; cancelBtn.textContent = 'Cancel';
		cancelBtn.addEventListener('click', ()=>{ try{ localStorage.setItem(SUGGESTION_KEY, '1'); }catch(e){}; overlay.remove(); });
		const submitBtn = document.createElement('button'); submitBtn.type = 'button'; submitBtn.className = 'btn-primary'; submitBtn.textContent = 'Submit';

		submitBtn.addEventListener('click', ()=>{
			const rating = form.querySelector('input[name="suggRating"]:checked')?.value || '0';
			const comments = textarea.value.trim();
			const anon = anonCheckbox.checked;
			const name = anon ? 'Anonymous' : (nameInput.value.trim() || 'Anonymous');
			const subject = `Halls Of Hell - Suggestion (rating ${rating})`;
			let body = `Page: ${window.location.href}\nRating: ${rating}\nName: ${name}\n\nComments:\n${comments}`;
			const mailto = `mailto:erinofotherworld.scrh001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			try{ localStorage.setItem(SUGGESTION_KEY, '1'); }catch(e){}
			// open the user's mail client to send the suggestion
			window.location.href = mailto;
			overlay.remove();
		});

		btns.appendChild(cancelBtn); btns.appendChild(submitBtn);

		modal.appendChild(title);
		modal.appendChild(message);
		modal.appendChild(hint);
		form.appendChild(ratingWrap);
		form.appendChild(textarea);
		form.appendChild(anonDiv);
		form.appendChild(nameInput);
		modal.appendChild(form);
		modal.appendChild(btns);
		overlay.appendChild(modal);

		// focus management
		function onKey(e){ if(e.key === 'Escape'){ try{ localStorage.setItem(SUGGESTION_KEY, '1'); }catch(e){}; overlay.remove(); document.removeEventListener('keydown', onKey); } }
		document.addEventListener('keydown', onKey);

		return overlay;
	}

	function showSuggestionBoxIfAppropriate(){
		try{ if(localStorage.getItem(SUGGESTION_KEY)) return; }catch(e){}
		// build and show
		const box = buildSuggestionBox();
		document.body.appendChild(box);
		const first = box.querySelector('input[name="suggRating"]'); if(first) first.focus();
	}

	document.addEventListener('DOMContentLoaded', function(){
		let dismissed = false;
		try { dismissed = !!localStorage.getItem(STORAGE_KEY); } catch(e){}
		if(!dismissed){
			const m = buildModal();
			document.body.appendChild(m);
			// focus first interactive element for accessibility
			const firstBtn = m.querySelector('button');
			if(firstBtn) firstBtn.focus();
		}
		// try to show the next-event popup when present on this page
		try { showNextEventPopupIfPresent(); } catch(e){ /* ignore if not present */ }
		// try to show the site suggestion box (skips Introduction.html)
		try { showSuggestionBoxIfAppropriate(); } catch(e){ /* ignore if not present */ }
		// generate pagan calendar if container is present
		try { generatePaganCalendar(); } catch(e){ /* ignore if not present */ }
		// highlight current day on calendar tables when appropriate
		try { highlightCalendarDays(); } catch(e){ /* ignore if not present */ }
		// initialize animated Demon cursor (uses PNG/SVG fallback) — disabled on touch
		try{ initAnimatedDemonCursor(); }catch(e){ /* ignore if not supported */ }
		// initialize embedded audio player controls and resume logic
		try { initSiteAudio(); } catch(e){ /* no audio on this page */ }
		// automatically set the nav active state based on current page
		try { autoSetActiveNav(); } catch(e){}
		// show media player reminder after 45 seconds
		try { showMediaPlayerReminder(); } catch(e){ /* ignore if not present */ }
	});

/* Generate Pagan Calendar with Sabbat Dates */
function generatePaganCalendar(){
	const container = document.getElementById('pagan-calendar-container');
	if(!container) return;

	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth(); // 0-based
	const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const holoYear = year + 10000;

	// Sabbat dates: month (0-based), day, name
	const sabbats = [
		{m: 1, d: 2, name: 'Imbolc'},
		{m: 1, d: 15, name: 'Lupercalia'},
		{m: 2, d: 20, name: 'Spring Equinox'},
		{m: 3, d: 30, name: 'Walpurgisnacht'},
		{m: 4, d: 1, name: 'Beltane'},
		{m: 5, d: 21, name: 'Litha'},
		{m: 7, d: 1, name: 'Lammas'},
		{m: 8, d: 22, name: 'Mabon'},
		{m: 9, d: 31, name: 'Samhain'},
		{m: 11, d: 21, name: 'Yule'}
	];

	// Get sabbats for current month
	const monthlySabbats = {};
	sabbats.forEach(s => {
		if(s.m === month) monthlySabbats[s.d] = s.name;
	});

	// Create calendar table
	const table = document.createElement('table');
	table.className = 'calendar';

	const caption = document.createElement('caption');
	caption.textContent = monthNames[month] + ' ' + holoYear + ' HE';
	table.appendChild(caption);

	// thead with day labels
	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');
	const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	dayLabels.forEach(label => {
		const th = document.createElement('th');
		th.textContent = label;
		headerRow.appendChild(th);
	});
	thead.appendChild(headerRow);
	table.appendChild(thead);

	// tbody with date cells
	const tbody = document.createElement('tbody');
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	let dayCounter = 1;
	let cellCounter = 0;
	let row = document.createElement('tr');

	// Empty cells before first day
	for(let i = 0; i < firstDay; i++){
		row.appendChild(document.createElement('td'));
		cellCounter++;
	}

	// Date cells
	for(let day = 1; day <= daysInMonth; day++){
		const td = document.createElement('td');
		td.textContent = day;

		// Mark sabbats
		if(monthlySabbats[day]){
			td.className = 'event';
			td.title = monthlySabbats[day];
		}

		row.appendChild(td);
		cellCounter++;

		// New row every 7 cells
		if(cellCounter % 7 === 0){
			tbody.appendChild(row);
			row = document.createElement('tr');
		}
	}

	// Trailing empty cells
	if(cellCounter % 7 !== 0){
		while(cellCounter % 7 !== 0){
			row.appendChild(document.createElement('td'));
			cellCounter++;
		}
	}
	tbody.appendChild(row);
	table.appendChild(tbody);

	// Inject into container
	container.appendChild(table);

	// Highlight today
	try { highlightCalendarDays(); } catch(e){}
}

/* Highlight current day in calendar tables */
function highlightCalendarDays(){
	const now = new Date();
	const today = now.getDate();
	const month = now.getMonth(); // 0-based
	const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	document.querySelectorAll('table.calendar').forEach(table => {
		// clear any previous markers
		table.querySelectorAll('td.today').forEach(td => td.classList.remove('today'));
		// determine the calendar month from caption if present
		const cap = table.querySelector('caption');
		let capMonth = null;
		if(cap){
			const m = cap.textContent.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
			if(m){
				capMonth = monthNames.findIndex(n => n.toLowerCase() === m[0].toLowerCase());
			}
		}
		// only highlight if calendar matches current month (or if no caption was found)
		if(capMonth !== null && capMonth !== month) return;

		const re = new RegExp('\\b' + today + '\\b');
		table.querySelectorAll('td').forEach(td => {			// never highlight the 29th day (explicit user preference)
			const num = parseInt(td.textContent.trim(), 10);
			if(!Number.isNaN(num) && num === 29) return;			if(re.test(td.textContent)){
				td.classList.add('today');
				td.setAttribute('aria-current','date');
			}
		});
	});
}

/* Media player reminder popup - shown after 45 seconds on each page visit */
function showMediaPlayerReminder(){
	// Check if audio player exists on this page
	const audioPlayer = document.getElementById('site-audio');
	if(!audioPlayer) return;
	
	setTimeout(()=>{
		const overlay = document.createElement('div');
		overlay.className = 'modal-overlay';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');

		const modal = document.createElement('div');
		modal.className = 'modal';

		const title = document.createElement('h2');
		title.textContent = '🎵 Music Player Reminder';

		const message = document.createElement('p');
		message.innerHTML = 'Don\'t forget there\'s a media player at the bottom of the page! You can skip through the playlist using the Previous/Next buttons, or stop the music anytime if you prefer silence.';

		const buttons = document.createElement('div');
		buttons.className = 'modal-buttons';

		const okBtn = document.createElement('button');
		okBtn.className = 'btn-primary pulse-btn';
		okBtn.textContent = 'Got it!';
		okBtn.addEventListener('click', () => {
			overlay.remove();
		});

		buttons.appendChild(okBtn);

		modal.appendChild(title);
		modal.appendChild(message);
		modal.appendChild(buttons);

		overlay.appendChild(modal);

		// Close on escape
		function onKey(e){
			if(e.key === 'Escape'){
				overlay.remove();
				document.removeEventListener('keydown', onKey);
			}
		}
		document.addEventListener('keydown', onKey);

		document.body.appendChild(overlay);
		
		// Focus the button for accessibility
		okBtn.focus();
	}, 45000); // 45 seconds delay
}

/* Auto-set active navigation link based on current URL pathname */
function autoSetActiveNav(){
  try{
    const links = document.querySelectorAll('nav p a');
    const currentFile = (window.location.pathname || '').split('/').pop() || 'HallsOfHell1.html';
    const currentLower = currentFile.toLowerCase();

    function normalize(s){ return (s||'').replace(/[^a-z0-9]/gi,'').toLowerCase(); }

    links.forEach(a => {
      try{
        const href = a.getAttribute('href') || '';
        const linkFile = (new URL(href, window.location.origin)).pathname.split('/').pop() || '';
        const linkLower = linkFile.toLowerCase();

        let isActive = false;
        // direct filename match
        if(linkLower && linkLower === currentLower) isActive = true;
        // explicit matches via data-matches="file1.html,file2.html"
        if(!isActive && a.dataset && a.dataset.matches){
          const matches = a.dataset.matches.split(',').map(s=>s.trim().toLowerCase());
          if(matches.includes(currentLower)) isActive = true;
        }
        // fallback: normalize and compare (handles index.html vs Introduction.html, hyphen/underscore variants, etc.)
        if(!isActive){
          const nLink = normalize(linkLower);
          const nCurrent = normalize(currentLower);
          if(nLink && (nCurrent === nLink || nCurrent.includes(nLink) || nLink.includes(nCurrent))) isActive = true;
        }

        if(isActive){
          a.classList.add('active');
          a.setAttribute('aria-current','page');
        } else {
          a.classList.remove('active');
          a.removeAttribute('aria-current');
        }
      }catch(e){/* ignore */}
    });
  }catch(e){/* ignore */}
}

})();

/* --- Next event detection & popup --- */
function parseEventDate(text){
	const months = { jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,sept:8,oct:9,nov:10,dec:11 };
	const mMatch = text.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)/i);
	const dMatch = text.match(/(\d{1,2})/);
	if(!mMatch || !dMatch) return null;
	const mStr = mMatch[0].toLowerCase().slice(0,3);
	const month = months[mStr];
	const day = parseInt(dMatch[0],10);
	if(isNaN(month) || isNaN(day)) return null;
	const now = new Date();
	let year = now.getFullYear();
	let dt = new Date(year, month, day, 12, 0, 0);
	if(dt < now) dt = new Date(year+1, month, day, 12, 0, 0);
	return dt;
}

function findUpcomingEventsFromTable(table){
	const rows = Array.from(table.querySelectorAll('tr')).slice(1);
	const events = [];
	for(const r of rows){
		if(!r.cells || r.cells.length < 2) continue;
		const dateText = r.cells[0].innerText.trim();
		const detail = r.cells[1].innerText.trim();
		const dt = parseEventDate(dateText);
		if(dt) events.push({date: dt, dateText, detail});
	}
	return events.sort((a,b)=>a.date - b.date);
}

function showNextEventPopupIfPresent(){
	const tables = Array.from(document.querySelectorAll('table'));
	const eventTable = tables.find(t => {
		const firstCell = t.querySelector('tr td');
		if(!firstCell) return false;
		return /Date\s*&\s*Time/i.test(firstCell.textContent) || /Date & Time/i.test(firstCell.textContent);
	});
	if(!eventTable) return;
	const events = findUpcomingEventsFromTable(eventTable);
	if(!events.length) return;
	const now = new Date();
	const next = events.find(e => e.date >= now) || events[0];

	// Show on every page load; do not suppress with localStorage.

	const popup = document.createElement('div');
	popup.className = 'event-popup';
	const header = document.createElement('h4');
	header.textContent = 'Next Event: ' + next.detail;
	const desc = document.createElement('p');
	desc.textContent = `${next.dateText} — ${next.date.toDateString()}`;
	const actions = document.createElement('div');
	actions.className = 'popup-actions';
	const viewBtn = document.createElement('button');
	viewBtn.className = 'btn-link';
	viewBtn.textContent = 'View Calendar';
	viewBtn.addEventListener('click', ()=>{
		eventTable.scrollIntoView({behavior:'smooth', block:'center'});
		// Apply highlight with transition
		eventTable.style.transition = 'box-shadow 0.3s ease-out';
		eventTable.style.boxShadow = '0 0 0 4px rgba(182,2,2,0.12)';
		setTimeout(()=>{ 
			eventTable.style.boxShadow = '';
			setTimeout(() => { eventTable.style.transition = ''; }, 300);
		}, 3000);
		popup.remove();
	});
	const dismiss = document.createElement('button');
	dismiss.className = 'btn-dismiss';
	dismiss.textContent = 'Dismiss';
	dismiss.addEventListener('click', ()=> popup.remove());
	actions.appendChild(viewBtn);
	actions.appendChild(dismiss);

	popup.appendChild(header);
	popup.appendChild(desc);
	popup.appendChild(actions);
	document.body.appendChild(popup);
	setTimeout(()=>{ popup && popup.remove(); }, 12000);
}

/* --- Embedded audio player: resume-on-navigation + basic controls --- */
function formatTime(sec){
	if(!isFinite(sec)) return '--:--';
	const s = Math.floor(sec%60).toString().padStart(2,'0');
	const m = Math.floor(sec/60).toString().padStart(2,'0');
	return `${m}:${s}`;
}

function initSiteAudio(){
	const audio = document.getElementById('site-audio');
	if(!audio) return;
	const container = audio.closest('.audio-player');
	const playBtn = container.querySelector('.play');
	const pauseBtn = container.querySelector('.pause');
	const stopBtn = container.querySelector('.stop');
	const prevBtn = container.querySelector('.prev');
	const nextBtn = container.querySelector('.next');
	const timeEl = container.querySelector('.time');
	const progressRange = container.querySelector('.progress');
	const volRange = container.querySelector('.volume');
	
	// Playlist configuration
	const playlist = [
		{
			src: 'audio/TheRestlessShadows.mp3',
			title: 'The Restless Shadow',
			artist: 'SUNO',
			art: 'images/LuciNLilithMeet.jpg'
		},
		{
			src: 'audio/FogOverSamaelsGate.mp3',
			title: 'Fog Over Samael\'s Gate',
			artist: 'SUNO',
			art: 'images/LuciNLilithMeet.jpg'
		},
		{
			src: 'audio/SamaelSplitMySoul.mp3',
			title: 'Samael Split My Soul',
			artist: 'SUNO',
			art: 'images/LuciNLilithMeet.jpg'
		},
		{
			src: 'audio/ExileOfTheSeraph.mp3',
			title: 'Exile of the Seraph',
			artist: 'SUNO',
			art: 'images/LuciNLilithMeet.jpg'
		}
	];
	
	let currentTrackIndex = 0;
	
	function loadTrack(index){
		if(index < 0 || index >= playlist.length) return;
		currentTrackIndex = index;
		const track = playlist[currentTrackIndex];
		
		// Update audio source
		const source = audio.querySelector('source');
		if(source){
			source.src = track.src;
			audio.load();
		}
		
		// Update metadata display
		const titleEl = container.querySelector('.song-title');
		const artistEl = container.querySelector('.artist');
		const artImg = container.querySelector('.album-art');
		
		if(titleEl) titleEl.textContent = track.title;
		if(artistEl) artistEl.textContent = track.artist;
		if(artImg){
			artImg.src = track.art;
			artImg.alt = track.title;
		}
		
		// Save current track
		try{
			sessionStorage.setItem('currentTrackIndex', String(currentTrackIndex));
		}catch(e){}
	}
	
	// Load saved track or default to first
	try{
		const savedIndex = sessionStorage.getItem('currentTrackIndex');
		if(savedIndex !== null){
			currentTrackIndex = parseInt(savedIndex, 10);
		}
	}catch(e){}
	loadTrack(currentTrackIndex);
	
	// Dynamic metadata: set title/artist/art from data- attributes if present
	try{
		const titleEl = container.querySelector('.song-title');
		const artistEl = container.querySelector('.artist');
		const artImg = container.querySelector('.album-art');
		
		// Make album art clickable to open preview
		if(artImg){ artImg.style.cursor = 'zoom-in'; artImg.addEventListener('click', ()=> openAlbumPreview(artImg.src, titleEl?.textContent || artImg.alt)); }
	}catch(e){ /* ignore */ }

	// restore time & playing state from sessionStorage
	try{
		const t = sessionStorage.getItem('siteAudioTime');
		if(t) audio.currentTime = parseFloat(t);
	}catch(e){}
	try{
		const playing = sessionStorage.getItem('siteAudioPlaying') === 'true';
		if(playing){ audio.play().catch(()=>{}); }
	}catch(e){}
	// restore volume
	try{
		const v = sessionStorage.getItem('siteAudioVolume');
		if(v !== null && volRange){
			const val = parseFloat(v);
			audio.volume = val;
			volRange.value = String(val);
		}
	}catch(e){}

	function updateTime(){
		if(timeEl){
			const cur = formatTime(audio.currentTime);
			const tot = isFinite(audio.duration) ? formatTime(audio.duration) : '--:--';
			timeEl.textContent = `${cur} / ${tot}`;
		}
		if(progressRange && isFinite(audio.duration) && audio.duration > 0){
			const pct = (audio.currentTime / audio.duration) * 100;
			progressRange.value = String(pct);
		}
	}
	audio.addEventListener('timeupdate', updateTime);
	audio.addEventListener('loadedmetadata', updateTime);
	
	// Auto-play next track when current ends
	audio.addEventListener('ended', ()=>{
		const nextIndex = (currentTrackIndex + 1) % playlist.length;
		loadTrack(nextIndex);
		audio.play().catch(()=>{});
	});

	// Fade out function for smooth track transitions
	function fadeOut(callback, duration = 300){
		const originalVolume = audio.volume;
		const step = originalVolume / (duration / 20);
		let currentVol = originalVolume;
		
		const fadeInterval = setInterval(()=>{
			currentVol -= step;
			if(currentVol <= 0){
				audio.volume = 0;
				clearInterval(fadeInterval);
				if(callback) callback();
				// Restore original volume after track change
				setTimeout(()=>{ audio.volume = originalVolume; }, 50);
			} else {
				audio.volume = currentVol;
			}
		}, 20);
	}

	if(playBtn) playBtn.addEventListener('click', ()=>{ audio.play().catch(()=>{}); });
	if(pauseBtn) pauseBtn.addEventListener('click', ()=>{ audio.pause(); });
	if(stopBtn) stopBtn.addEventListener('click', ()=>{ audio.pause(); audio.currentTime = 0; updateTime(); if(progressRange) progressRange.value = '0'; });
	
	// Previous/Next track buttons with fade-out
	if(prevBtn) prevBtn.addEventListener('click', ()=>{
		if(!audio.paused){
			fadeOut(()=>{
				const prevIndex = currentTrackIndex - 1 >= 0 ? currentTrackIndex - 1 : playlist.length - 1;
				loadTrack(prevIndex);
				audio.play().catch(()=>{});
			});
		} else {
			const prevIndex = currentTrackIndex - 1 >= 0 ? currentTrackIndex - 1 : playlist.length - 1;
			loadTrack(prevIndex);
			audio.play().catch(()=>{});
		}
	});
	if(nextBtn) nextBtn.addEventListener('click', ()=>{
		if(!audio.paused){
			fadeOut(()=>{
				const nextIndex = (currentTrackIndex + 1) % playlist.length;
				loadTrack(nextIndex);
				audio.play().catch(()=>{});
			});
		} else {
			const nextIndex = (currentTrackIndex + 1) % playlist.length;
			loadTrack(nextIndex);
			audio.play().catch(()=>{});
		}
	});
	
	if(volRange){
		volRange.addEventListener('input', (e)=>{
			const val = parseFloat(e.target.value);
			audio.volume = val;
		});
	}
	if(progressRange){
		// seeking via the range input
		progressRange.addEventListener('input', (e)=>{
			if(isFinite(audio.duration) && audio.duration > 0){
				const pct = parseFloat(e.target.value);
				audio.currentTime = (pct/100) * audio.duration;
				updateTime();
			}
		});
	}

	function saveState(){
		try{
			sessionStorage.setItem('siteAudioTime', String(audio.currentTime));
			sessionStorage.setItem('siteAudioPlaying', String(!audio.paused));
			// save volume too
			if(volRange) sessionStorage.setItem('siteAudioVolume', String(parseFloat(volRange.value)));
		}catch(e){}
	}
	
	function openAlbumPreview(src, title){
		if(!src) return;
		const overlay = document.createElement('div');
		overlay.className = 'album-overlay';
		overlay.setAttribute('role','dialog');
		overlay.setAttribute('aria-modal','true');
		overlay.tabIndex = -1;
		
		const img = document.createElement('img');
		img.className = 'album-preview';
		img.src = src;
		img.alt = title || 'Album art preview';
		
		overlay.addEventListener('click', (e)=>{ if(e.target === overlay) overlay.remove(); });
		document.addEventListener('keydown', function onKey(e){ if(e.key === 'Escape'){ overlay.remove(); document.removeEventListener('keydown', onKey); } });
		
		overlay.appendChild(img);
		document.body.appendChild(overlay);
		overlay.focus();
	}
	
	window.addEventListener('beforeunload', saveState);
	document.addEventListener('visibilitychange', ()=>{ if(document.hidden) saveState(); });
}