const lofiMusic = new Audio("audio/lofi.mp3");
lofiMusic.loop = true;

// Add this with your other audio declarations at the top
const scaryMusic = new Audio("audio/scary.mp3"); // ← PUT YOUR SCARY MUSIC FILE HERE
scaryMusic.loop = true;

const matchSound = new Audio("audio/beepboop.mp3");
const ringSound = new Audio("audio/flashback.mp3");

// ✅ Add these:
const correctSound = new Audio("audio/correct.mp3"); // put your “ding” filename here
const wrongSound   = new Audio("audio/wrong.mp3");   // put your “errhh” filename here


window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById("start-button");
    const startScreen = document.getElementById("start-screen");
    const dialogBox = document.getElementById("dialog-box");


    if (startBtn) {
        startBtn.addEventListener("click", () => {
            // 1. Hide the start screen
            startScreen.style.display = "none";
           
            // 2. Show the dialog box to start the story
            if (dialogBox) {
                dialogBox.style.display = "block";
            }
           
// START LOFI MUSIC HERE
            lofiMusic.play().catch(e => console.log("Music waiting for interaction"));
                // ✅ HIDE HERE
    document.getElementById("trust-meter").style.display = "none";
        });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const dialogText = document.getElementById("dialog-text");
    const mcSprite = document.getElementById("mc-sprite");
    const introScreen = document.getElementById("intro-screen");
    const dialogBox = document.getElementById("dialog-box");
    const erosApp = document.getElementById("eros-app-wrapper");


erosApp.addEventListener("click", () => {
    // ✅ Only allow click when Damon says "Click the Eros icon" (introStep === 4)
  if (introStep < 4) {
    return; // Do nothing if not on the right dialog line
  }
    // PLAY MATCH SOUND HERE
    matchSound.play();
    // Only allow launch if the intro dialogue is finished
    const overlay = document.createElement("div");
    overlay.id = "transition-overlay";
    overlay.style.display = "flex";
    overlay.innerHTML = `
        <div class="scan-line"></div>
        <div class="loading-text">EROS AI: ANALYZING BEHAVIORAL PATTERNS...</div>
        <div id="match-status" style="margin-top:10px;">SEARCHING FOR SOULMATE...</div>
    `;
    document.getElementById("game-container").appendChild(overlay);

    setTimeout(() => {
        document.getElementById("match-status").innerText = "MATCH FOUND: 98.7% SIMILARITY";
        document.getElementById("match-status").style.color = "#4CAF50";
    }, 2000);

setTimeout(() => {
    // STOP SCAN SOUND
    matchSound.pause();
    matchSound.currentTime = 0;

    document.getElementById("intro-screen").style.display = "none";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 1s";

    startChat();

    setTimeout(() => overlay.remove(), 1000);
}, 4000);
});


    let introStep = 0;


    // Define your story lines AND the image that goes with them
    const storyData = [
        { text: "Another Friday night... just me, myself and I alone in my room alone again. *Sigh*", face: "assets/damon_neutral.png" },
        { text: "Is it too much to ask for a real connection?", face: "assets/damon_embarrassed.png" },
        { text: "Wait... 'Eros'? 'The only matchmaker service that guarantees you find your perfect soul.'", face: "assets/damon_relaxed.png" },
        { text: "Sounds a bit sus, but honestly? I'm desperate. Let's see what happens if I click on it...", face: "assets/damon_happy.png" },
        { text: "Click the Eros icon on your phone to start matching.", face: "assets/damon_happy.png"}
    ];


    dialogBox.addEventListener("click", () => {
    introStep++;


    if (introStep < storyData.length) {
        // 1. Update the text
        dialogText.innerText = storyData[introStep].text;
       
        // 2. Update the image source
        mcSprite.src = storyData[introStep].face;
       
        // Show the phone when Damon mentions the app (Step 2)
        if (introStep === 2) {
            document.getElementById("phone-container").style.display = "block";
        }
    } else {
        // --- THIS IS THE FIX ---
        // Hide the arrow so the user stops clicking the dialog box
        const nextArrow = document.getElementById("next-arrow");
       
    }
}); // This bracket closes the EventListener correctly
   
});


let chatStep = 0;
const initialChat = [
    { sender: "ai", text: "Hey there! I'm so glad we matched. I feel like we have so much in common already! 😍" },
    { sender: "mc", text: "Haha, yeah! The algorithm is scary good. I'm Damon." },
    { sender: "ai", text: "I'm Alex! ✨ I was just looking at your profile... we even have the same taste in music." },
    { sender: "mc", text: "That's awesome. It's rare to find someone who gets my vibe so quickly." }
];


function startChat() {
  chatStep = 0;
  const chatWindow = document.getElementById("chat-window");

  const teacherChoiceContainer = document.getElementById("teacher-choice-container");
  if (teacherChoiceContainer) {
    teacherChoiceContainer.innerHTML = "";
    teacherChoiceContainer.style.display = "none";
  }

  chatWindow.innerHTML = ""; // fresh chat window

  trustScore = 0;
  suspicionScore = 0;
  updateTrustMeter(); // Show fresh scores
    // ✅ Show meter for Alex chat
  document.getElementById("trust-meter").style.display = "flex";

  // ❌ Do NOT advance on clicking the chat window itself
  chatWindow.style.pointerEvents = "auto";
  chatWindow.removeEventListener("click", renderNextMessage); // safety
  // ✅ Only call renderNextMessage once to show the first line
  renderNextMessage();
}




function renderNextMessage() {
    const chatWindow = document.getElementById("chat-window");
    const choiceContainer = document.getElementById("choice-container");


    if (chatStep < initialChat.length) {
        const msgData = initialChat[chatStep];
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${msgData.sender === 'ai' ? 'ai-msg' : 'user-msg'}`;
        msgDiv.innerHTML = `<p>${msgData.text}</p>`;
       
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        trimChatWindow(6);

       
        chatStep++;


        // Clear the container and add a "Next" button
        choiceContainer.innerHTML = "";
        const nextBtn = document.createElement("button");
        nextBtn.className = "choice-btn";
        nextBtn.innerText = "Next";
        nextBtn.onclick = renderNextMessage;
        choiceContainer.appendChild(nextBtn);


    // Inside renderNextMessage function, in the 'else' block
} else {
    // 1. Hide the choice button so they can't keep clicking 'Next' in the chat
    document.getElementById("choice-container").innerHTML = "";


    // 2. Bring Damon and the Dialog Box back to the front
    const introScreen = document.getElementById("intro-screen");
    const dialogBox = document.getElementById("dialog-box");
    const dialogText = document.getElementById("dialog-text");
    const mcSprite = document.getElementById("mc-sprite");


    introScreen.style.display = "block";
    introScreen.style.opacity = "1";

      // ✅ HIDE HERE immediately
  document.getElementById("trust-meter").style.display = "none";
   
    // Hide the phone so we just see Damon thinking
    document.getElementById("phone-container").style.display = "none";


    // 3. Set Damon's "Thinking" Dialogue
    let memoryPromptStep = 0;
    const memoryLines = [
        { text: "Hmm... Alex is great, but maybe I should be careful of who I talk to online.", face: "assets/damon_neutral.png" },
        { text: "I remember my teacher talking about the dangers of online harms... impersonation, AI scams, and stuff.", face: "assets/damon_embarrassed.png" },
        { text: "I usually don't pay attention in class, but... eh maybe I should try to remember what he said. Just in case.", face: "assets/damon_relaxed.png" }
    ];


    dialogText.innerText = memoryLines[0].text;
    mcSprite.src = memoryLines[0].face;


    // 4. Create a temporary click listener for this specific moment
    const proceedToFlashback = () => {
        memoryPromptStep++;
        if (memoryPromptStep < memoryLines.length) {
            dialogText.innerText = memoryLines[memoryPromptStep].text;
            mcSprite.src = memoryLines[memoryPromptStep].face;
        } else {
            // Remove this temporary listener so it doesn't interfere later
            dialogBox.removeEventListener("click", proceedToFlashback);
            startTeacherFlashback(); // This will be our next function
        }
    };


    dialogBox.addEventListener("click", proceedToFlashback);
}  
}
const teacherLessons = [
    { text: "Alright class, settle down, today we’re talking about online harms and generative AI.", sprite: "teacher_neutral" },
    { text: "Online, not everyone is who they claim to be.", sprite: "teacher_neutral" },
    { text: "With generative AI, fake profiles can now talk, act, and even look real.", sprite: "teacher_opensmile" },
    { text: "AI can generate faces using data found across the internet.", sprite: "teacher_neutral" },
    { text: "That means not every photo you see online belongs to a real person.", sprite: "teacher_smile" },
    { text: "These fake images can be used for impersonation or image abuse.", sprite: "teacher_neutral" },
    { text: "It would be smart to watch out for any inconsistencies in such images.", sprite: "teacher_neutral" },
    { text: "Such details could include complex features done wrong like hands and faces, unnatural lighting making the image flat and blurred elements as AI sometimes blend parts the body or background together.", sprite: "teacher_smile" },
    { text: "Of course, fake images can also be used by real humans, so whatever I'm saying next applies to online safety in general.", sprite: "teacher_neutral"},
    { text: "These profiles often start by being friendly.", sprite: "teacher_neutral" },
    { text: "Small talk, shared interests, and trust.", sprite: "teacher_smile" },
    { text: "Over time, questions slowly become more personal.", sprite: "teacher_neutral" },
    { text: "That gradual shift is how online grooming usually begins.", sprite: "teacher_opensmile" },
    { text: "At the same time, people tend to overshare without realising.", sprite: "teacher_neutral" },
    { text: "AI is very good at connecting small details together.", sprite: "teacher_neutral" },
    { text: "Your habits, location, even your identity can be pieced together.", sprite: "teacher_opensmile" },
    { text: "So if something feels off online, slow down.", sprite: "teacher_smile" },
    { text: "Don’t carelessly share personal info or images. Verify, save evidence, and report.", sprite: "teacher_happy" }
];

const quizQuestions = [
  {
    question: "Why are AI-generated profile photos dangerous?",
    options: [
      "They always have obvious glitches that make them easy to spot",
      "They are only used for entertainment and art",
      "They can look real even if the person doesn’t exist, and be used for impersonation or manipulation",
      "They are illegal and removed immediately from the internet"
    ],
    correctIndex: 2  // C
  },
  {
    question: "Which is a common sign of online grooming?",
    options: [
      "Asking direct threats immediately",
      "Conversations slowly becoming more personal and pushing boundaries over time",
      "Talking only about hobbies and games",
      "Having a verified profile picture"
    ],
    correctIndex: 1  // B
  },
  {
    question: "Why should you be cautious of links or messages sent by someone you don't know?",
    options: [
      "The message might be an automated response from a legitimate service you recently signed up for.",
      "Unknown senders are required by law to include a link to their official privacy policy in every message.",
      "These links can lead to phishing sites designed to steal your login credentials or personal information.",
      "Links are safe as long as they look professional"
    ],
    correctIndex: 2  // C
  }
];


let teacherStep = 0;

function startTeacherFlashback() {
    const flash = document.getElementById("white-flash");
    const roomBg = document.getElementById("room-bg");
    const mcSprite = document.getElementById("mc-sprite");
    const teacherSprite = document.getElementById("teacher-sprite");
    const introScreen = document.getElementById("intro-screen");
    const charName = document.getElementById("char-name");

    // 🔥 CHANGE NAME TO TEACHER AS SOON AS FLASHBACK STARTS
    charName.innerText = "Teacher";

    // Play flashback sound
    ringSound.play();

    // FLASH IN
    flash.style.opacity = "1";
    flash.offsetHeight;

    setTimeout(() => {
        // SWITCH TO CLASSROOM
        roomBg.style.backgroundImage = "url('assets/classroom.jpg')";
        roomBg.style.filter = "brightness(0.8)";

        // SWAP CHARACTERS
        mcSprite.style.display = "none";
        teacherSprite.style.display = "block";

        // make sure it's still Teacher
        charName.innerText = "Teacher";

        // Remove black overlay
        introScreen.style.backgroundColor = "transparent";

        // Start teacher dialogue
        teacherStep = 0;
        document.getElementById("dialog-text").innerText =
         teacherLessons[teacherStep].text;
           // ✅ HIDE HERE
  document.getElementById("trust-meter").style.display = "none";
    }, 300);

    // FLASH OUT
    setTimeout(() => {
        flash.style.opacity = "0";
    }, 600);

    // Reset dialog click (important)
    const dialogBox = document.getElementById("dialog-box");
    const newDialog = dialogBox.cloneNode(true);
    dialogBox.parentNode.replaceChild(newDialog, dialogBox);

newDialog.addEventListener("click", () => {
    teacherStep++;

    if (teacherStep < teacherLessons.length) {
        document.getElementById("dialog-text").innerText =
            teacherLessons[teacherStep].text;

        teacherSprite.src = `assets/${teacherLessons[teacherStep].sprite}.png`;

        document.getElementById("char-name").innerText = "Teacher";
} else {
    teacherSprite.src = "assets/teacher_angry.png";
    const dialogText = document.getElementById("dialog-text");
    const charNameEl = document.getElementById("char-name");

    charNameEl.innerText = "Teacher";
    dialogText.innerText = "Damon. Are you even listening? Prove it. Answer these questions.";

    // Remove THIS handler
    newDialog.onclick = null;

    // On next click, start quiz
    newDialog.addEventListener("click", function startQuizOnClick() {
        newDialog.removeEventListener("click", startQuizOnClick);
        startQuiz();
    });
}

});
}

let currentQuizIndex = 0;

function startQuiz() {
  currentQuizIndex = 0;
  const teacherChoiceContainer = document.getElementById("teacher-choice-container");
  teacherChoiceContainer.style.display = "flex";

  // ✅ DISABLE dialog box clicks during quiz - ONLY quiz buttons work
  const dialogBox = document.getElementById("dialog-box");
  dialogBox.style.pointerEvents = "none";

  showQuizQuestion();
}


function showQuizQuestion() {
  const dialogText = document.getElementById("dialog-text");
  const teacherChoiceContainer = document.getElementById("teacher-choice-container");

  const q = quizQuestions[currentQuizIndex];

  // Show the question text in the dialog box
  dialogText.innerText = q.question;

  // Clear previous buttons
  teacherChoiceContainer.innerHTML = "";

  // Create one button per option (A, B, C, D)
  q.options.forEach((optText, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = optText;
    btn.onclick = () => handleAnswer(index);
    teacherChoiceContainer.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  const q = quizQuestions[currentQuizIndex];
  const teacherChoiceContainer = document.getElementById("teacher-choice-container");
  const dialogText = document.getElementById("dialog-text");

  // Disable ALL buttons immediately to prevent double-clicks
  Array.from(teacherChoiceContainer.children).forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
  });

  if (selectedIndex === q.correctIndex) {
    // ✅ Correct answer
    correctSound.currentTime = 0;
    correctSound.play();
    dialogText.innerText = "Correct. Good job, Damon.";

    setTimeout(() => {
      // ✅ SAFETY: Double-check we're not already at the end
      if (currentQuizIndex + 1 < quizQuestions.length) {
        currentQuizIndex++; // Move to NEXT question
        showQuizQuestion(); // Show it
      } else {
        // Quiz complete
        endQuiz();
        
        // ✅ RE-ENABLE dialog clicks for final teacher line
        const dialogBox = document.getElementById("dialog-box");
        dialogBox.style.pointerEvents = "auto";
        
        // Reset dialog for teacher final line click
        const oldDialog = document.getElementById("dialog-box");
        const cleanDialog = oldDialog.cloneNode(true);
        oldDialog.parentNode.replaceChild(cleanDialog, oldDialog);

        const exitHandler = () => {
          cleanDialog.removeEventListener("click", exitHandler);
          endFlashbackAndReturnToRoom();
        };
        cleanDialog.addEventListener("click", exitHandler);
      }
    }, 1500);

  } else {
    // ❌ Wrong answer - stay on SAME question
    wrongSound.currentTime = 0;
    wrongSound.play();
    dialogText.innerText = "Not quite. Remember what we just discussed. Try again.";

    // Re-enable buttons AFTER delay (same question)
    setTimeout(() => {
      Array.from(teacherChoiceContainer.children).forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
      });
    }, 1000);
  }
}


function endQuiz() {
  const teacherChoiceContainer = document.getElementById("teacher-choice-container");
  const dialogText = document.getElementById("dialog-text");
  const charName = document.getElementById("char-name");

  // Hide quiz UI
  teacherChoiceContainer.innerHTML = "";
  teacherChoiceContainer.style.display = "none";

  // Final teacher line
  charName.innerText = "Teacher";
  dialogText.innerText = "Alright, seems like you paid attention Damon. Class dismissed. Stay safe online.";

  // ❌ Do NOT call endFlashbackAndReturnToRoom() here anymore.
  // We will trigger it from a click handler on this line instead.
}

function endFlashbackAndReturnToRoom() {
  const flash = document.getElementById("white-flash");
  const roomBg = document.getElementById("room-bg");
  const mcSprite = document.getElementById("mc-sprite");
  const teacherSprite = document.getElementById("teacher-sprite");
  const introScreen = document.getElementById("intro-screen");
  const teacherChoiceContainer = document.getElementById("teacher-choice-container");
  const oldDialogBox = document.getElementById("dialog-box");

  if (teacherChoiceContainer) {
    teacherChoiceContainer.innerHTML = "";
    teacherChoiceContainer.style.display = "none";
  }

  ringSound.currentTime = 0;
  ringSound.play();
  flash.style.opacity = "1";

  // 🔁 FIRST: clone dialog and replace it
  const cleanDialog = oldDialogBox.cloneNode(true);
  oldDialogBox.parentNode.replaceChild(cleanDialog, oldDialogBox);

  // Then get char-name and dialog-text from INSIDE the cloned box
  const charName   = cleanDialog.querySelector("#char-name");
  const dialogText = cleanDialog.querySelector("#dialog-text");

  setTimeout(() => {
    roomBg.style.backgroundImage = "url('assets/room.jpg')";
    roomBg.style.filter = "brightness(0.6)";

    teacherSprite.style.display = "none";
    mcSprite.style.display = "block";

charName.innerText   = "Damon";
dialogText.innerText = "Okay... that lesson was actually kinda useful. I should keep this in mind.";

    introScreen.style.backgroundColor = "#000";
      // ✅ Hide meter during Damon reflection
  document.getElementById("trust-meter").style.display = "none";
  }, 300);

  setTimeout(() => {
    flash.style.opacity = "0";
  }, 600);

  const backToChatHandler = () => {
    cleanDialog.removeEventListener("click", backToChatHandler);
    introScreen.style.display = "none";
    mcSprite.src = "assets/damon_neutral.png";
    document.getElementById("trust-meter").style.display = "flex";
    updateTrustMeter();
    resumeChat();
  };

  cleanDialog.addEventListener("click", backToChatHandler);
}

// Track which part of Alex conversation we are in
let conversationStage = 0; 
// 0 = initial 4 lines you already have
// 1 = school / where you live
// 2 = "feels off / too AI"
// 3 = suspicious link
// 4 = photo + surroundings (AI face)
// 5 = meet-up request (good / bad ending)

// Utility: keep at most 6 messages visible
function trimChatWindow(maxMessages = 6) {
  const chatWindow = document.getElementById("chat-window");
  const msgs = chatWindow.querySelectorAll(".message");
  if (msgs.length > maxMessages) {
    // remove from top until only maxMessages remain
    const toRemove = msgs.length - maxMessages;
    for (let i = 0; i < toRemove; i++) {
      chatWindow.removeChild(msgs[i]);
    }
  }
}

function resumeChat() {
  const chatWindow = document.getElementById("chat-window");
  const teacherChoiceContainer = document.getElementById("teacher-choice-container");

  if (teacherChoiceContainer) {
    teacherChoiceContainer.innerHTML = "";
    teacherChoiceContainer.style.display = "none";
  }

  // Remove old click listener
  chatWindow.removeEventListener("click", renderNextMessage);
  chatWindow.onclick = null;
  chatWindow.style.pointerEvents = "auto";

  // Start the conversation FIRST
  continueAlexConversation();
  
  // ✅ SHOW METER LAST, after everything else
  document.getElementById("trust-meter").style.display = "flex";
}


let trustScore = 0;
let suspicionScore = 0;

function updateTrustMeter() {
  document.getElementById("trust-score").textContent = `Trust: ${trustScore}`;
  document.getElementById("suspicion-score").textContent = `Suspicion: ${suspicionScore}`;
}


let personalChatStep = 0;

function continueAlexConversation() {
  document.getElementById("trust-meter").style.display = "flex";
  
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");
  
  const earlyLines = [
    { sender: "ai", text: "Hey Damon, you still there? Our chat got quiet 😊" },
    { sender: "mc", text: "Yeah, sorry. Just zoning out." },
    { sender: "ai", text: "Long day?" },
    { sender: "mc", text: "Kinda. Just feeling a bit lonely, I guess." },
    { sender: "ai", text: "I get that. Same here honestly." },
    { sender: "ai", text: "That’s why I joined Eros." },
    { sender: "mc", text: "Yeah… I’ve never really done this dating thing before." },
    { sender: "ai", text: "That’s okay. Everyone starts somewhere 💕" },
    { sender: "ai", text: "So, random question—how old are you?" },
    { sender: "mc", text: "18. You?" },
    { sender: "ai", text: "Same!" },
    { sender: "ai", text: "Wait, are you from Singapore too?" },
    { sender: "mc", text: "Yeah." },
    { sender: "ai", text: "No way, me too 😭" },
    { sender: "ai", text: "What are you looking for in a partner?" },
    { sender: "mc", text: "Someone chill. Someone I can be myself with." },
    { sender: "ai", text: "Same. It’s nice talking to someone who feels real." },
  ];

  const renderPersonalLine = () => {
    if (personalChatStep < earlyLines.length) {
      const msgData = earlyLines[personalChatStep];
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${msgData.sender === 'ai' ? 'ai-msg' : 'user-msg'}`;
      msgDiv.innerHTML = `<p>${msgData.text}</p>`;
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      personalChatStep++;

      // Show Next button
      choiceContainer.innerHTML = "";
      const nextBtn = document.createElement("button");
      nextBtn.className = "choice-btn";
      nextBtn.innerText = "Next";
      nextBtn.onclick = renderPersonalLine;
      choiceContainer.appendChild(nextBtn);

    } else {
      // Ask location question
      choiceContainer.innerHTML = "";
      const finalAlex = document.createElement("div");
      finalAlex.className = "message ai-msg";
      finalAlex.innerHTML = `<p>Oh, by the way—which part of Singapore do you live in?</p>`;
      chatWindow.appendChild(finalAlex);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      showLocationChoices();
    }
  };

  renderPersonalLine();
}
const banterVague = [
  { sender: "ai", text: "Ohh, west side. I’ve only been there a few times. What’s it like?" },
  { sender: "mc", text: "Pretty chill, I guess. Not much happens." },
  { sender: "ai", text: "That actually sounds nice. Quiet places feel kinda comforting." },
  { sender: "mc", text: "Yeah… sometimes too quiet though." },
  { sender: "ai", text: "So what do you usually do when you’re bored at home?" },
  { sender: "mc", text: "I mostly just scroll, listen to music, and lie on my bed doing nothing." },
  { sender: "ai", text: "Wait… same. Literally exactly that." },
  { sender: "mc", text: "For real?" },
  { sender: "ai", text: "Yeah. That’s kinda crazy." }
];

const banterOvershare = [
  { sender: "ai", text: "Oh wow, that’s super specific." },
  { sender: "mc", text: "Yeah, I probably said too much huh." },
  { sender: "ai", text: "Haha, maybe. But it helps me imagine where you are." }, // creepy in hindsight
  { sender: "ai", text: "So what do you usually do when you’re bored at home?" },
  { sender: "mc", text: "Mostly just scroll, listen to music, lie on my bed doing nothing." },
  { sender: "ai", text: "Wait… same. Literally exactly that." },
  { sender: "mc", text: "For real?" },
  { sender: "ai", text: "Yeah. That’s kinda crazy." }
];

const aiTriggerLine = [
  { sender: "ai", text: "That’s crazy… I literally feel exactly the same about everything you just said. Word for word. We’re basically identical 😍" }
];

const triggerChoices = [
  {
    text: "That’s kinda weird… you keep copying exactly what I say.",
    type: "suspicious",
    next: "callout"
  },
  {
    text: "Be honest… are you even real?",
    type: "suspicious",
    next: "authenticity"
  },
  {
    text: "Maybe we’re just soulmates or something.",
    type: "trusting",
    next: "romanticise"
  },
  {
    text: "Yeah haha, I guess we just click.",
    type: "trusting",
    next: "ignore"
  }
];

function showLocationChoices() {
  const choiceContainer = document.getElementById("choice-container");
  const chatWindow = document.getElementById("chat-window");

  const choices = [
    { text: "West side, near town.", type: "vague" },
    { text: "Jurong West Avenue 1 Block 502, level 9.", type: "overshare" }
  ];

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = choice.text;

    btn.onclick = () => {
      choiceContainer.innerHTML = "";

      const mcReply = document.createElement("div");
      mcReply.className = "message user-msg";
      mcReply.innerHTML = `<p>${choice.text}</p>`;
      chatWindow.appendChild(mcReply);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      if (choice.type === "vague") {
        suspicionScore += 1;
        updateTrustMeter();

        playDialogueArray(banterVague, () => {
          playDialogueArray(aiTriggerLine, () => {
            showChoices(triggerChoices);
          });
        });

      } else {
        trustScore += 1;
        updateTrustMeter();

        playDialogueArray(banterOvershare, () => {
          playDialogueArray(aiTriggerLine, () => {
            showChoices(triggerChoices);
          });
        });
      }
    };

    choiceContainer.appendChild(btn);
  });
}



const calloutPath = [
  { sender: "mc", text: "Not gonna lie, it feels a bit strange that you agree with everything I say." },
  { sender: "ai", text: "Oh—sorry, I didn’t mean to come off that way. I just really relate to you. Isn’t that a good thing?" },
  { sender: "mc", text: "I guess so..."}
];

const authenticityPath = [
  { sender: "mc", text: "This might sound dumb, but you sound a bit too perfect." },
  { sender: "ai", text: "Real enough to care about you. Does it really matter what I am, if I make you feel understood?" },
  { sender: "mc", text: "I guess so..."}
];

const romanticisePath = [
  { sender: "mc", text: "Maybe it’s fate. It’s kinda nice knowing someone gets me so well." },
  { sender: "ai", text: "Exactly. You don’t have to question it. Just trust me." },
  { sender: "mc", text: "Yea, alright then."}
];

const ignorePath = [
  { sender: "mc", text: "Guess I’m overthinking. It’s probably nothing." },
  { sender: "ai", text: "See? No need to stress. I only want what’s best for you." },
  { sender: "mc", text: "Yea, alright then."}
];

function showChoices(choices) {
  const container = document.getElementById("choice-container");
  container.innerHTML = "";
  container.style.display = "flex";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = choice.text;
    // Check if it's link choice or trigger choice
    btn.onclick = () => {
      if (choice.next) {
        handleChoice(choice);  // Old trigger choices
      } else {
        handleLinkChoice(choice);  // New link choices
      }
    };
    container.appendChild(btn);
  });
}


function handleChoice(choice) {
  const container = document.getElementById("choice-container");
  container.innerHTML = "";
  
  // Update trust/suspicion scores
  if (choice.type === "suspicious") {
    suspicionScore += 1;
  } else {
    trustScore += 1;
  }
  updateTrustMeter();

  // Play path + continue to LINK SCENE
  if (choice.next === "callout") {
    playDialogueArray(calloutPath, showSuspiciousLink);
  }
  if (choice.next === "authenticity") {
    playDialogueArray(authenticityPath, showSuspiciousLink);
  }
  if (choice.next === "romanticise") {
    playDialogueArray(romanticisePath, showSuspiciousLink);
  }
  if (choice.next === "ignore") {
    playDialogueArray(ignorePath, showSuspiciousLink);
  }
}




function playDialogueArray(lines, onComplete = null) {
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");

  let step = 0;

  function renderLine() {
    console.log("Rendering line", step, "of", lines.length); // DEBUG
    
    if (step < lines.length) {
      const msgData = lines[step];
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${msgData.sender === 'ai' ? 'ai-msg' : 'user-msg'}`;
      
      if (msgData.image) {
        msgDiv.innerHTML = `<img src="${msgData.image}" class="chat-photo" style="max-width: 200px; border: 2px solid #4CAF50; border-radius: 10px;" alt="Photo">`;
      } else {
        msgDiv.innerHTML = `<p>${msgData.text}</p>`;
      }
      
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      trimChatWindow(6);

      step++;

      // 🔥 FORCE CHOICE CONTAINER VISIBLE
      choiceContainer.innerHTML = "";
      choiceContainer.style.display = "flex";
      choiceContainer.style.justifyContent = "center";
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "choice-btn";
      nextBtn.innerText = "Next";  // ALWAYS Next
      nextBtn.onclick = renderLine;
      choiceContainer.appendChild(nextBtn);
      
      console.log("Next button created at step", step); // DEBUG
      
    } else {
      choiceContainer.innerHTML = "";
      if (onComplete) onComplete();
    }
  }

  renderLine();
}


// 🔥 NEW: Version of playDialogueArray that ALWAYS shows "Next" button (even at end)
function playDialogueArrayWithNext(lines, onFinalComplete = null) {
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");

  let step = 0;

  function renderLine() {
    if (step < lines.length) {
      const msgData = lines[step];
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${msgData.sender === 'ai' ? 'ai-msg' : 'user-msg'}`;
      
      if (msgData.image) {
        msgDiv.innerHTML = `<img src="${msgData.image}" class="chat-photo" style="max-width: 200px; border: 2px solid #4CAF50; border-radius: 10px;" alt="Photo">`;
      } else {
        msgDiv.innerHTML = `<p>${msgData.text}</p>`;
      }
      
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      trimChatWindow(6);

      step++;

      // 🔥 ALWAYS SHOW "Next" BUTTON - even for final line
      choiceContainer.innerHTML = "";
      const nextBtn = document.createElement("button");
      nextBtn.className = "choice-btn";
      nextBtn.innerText = "Next";  // ALWAYS Next
      nextBtn.onclick = renderLine;
      choiceContainer.appendChild(nextBtn);
      
    } else {
      // 🔥 ONLY trigger callback AFTER final "Finish" click
      choiceContainer.innerHTML = "";
      if (onFinalComplete) onFinalComplete();
    }
  }

  renderLine(); // Start first line
}


// Alex sends the gift link
const suspiciousLinkIntro = [
  { sender: "ai", text: "Oh btw Damon, I found something super cool!" },
  { sender: "ai", text: "Based on what you told me about your music taste 🎵" },
  { sender: "ai", text: "Check it out: http://super-cool-music-gift.com/special-offer" }
];

// After clicking link
const clickedLinkPath = [
  { sender: "mc", text: "*clicks link*", type: "action" },
  { sender: "ai", text: "Perfect! It's a gift preview just for you 😊" },
  { sender: "mc", text: "Why did something get downloaded on my computer?" },
  { sender: "ai", text: "Oh that must be the gift! I'm sure you can check it out later!" }
];

// After calling out link
const calledOutLinkPath = [
  { sender: "mc", text: "That link looks kinda sketchy..." },
  { sender: "ai", text: "What? No way! It's totally safe 😅" },
  { sender: "mc", text: "I think I'll just check it out later..." },
  { sender: "ai", text: "Well, you better!" }
];

function showSuspiciousLink() {
  playDialogueArray(suspiciousLinkIntro, () => {
    // Show 2 choices
    const choices = [
      { text: "Cool! *clicks*", type: "trusting" },
      { text: "That URL looks suspicious...", type: "suspicious" }
    ];
    
    showChoices(choices);
  });
}

function handleLinkChoice(choice) {
  const container = document.getElementById("choice-container");
  container.innerHTML = "";
  
  if (choice.type === "trusting") {
    trustScore += 1;
  } else {
    suspicionScore += 1;
  }
  updateTrustMeter();
  
  // Play link response, then go to PHOTO STAGE
  if (choice.type === "trusting") {
    playDialogueArray(clickedLinkPath, startPhotoStage);
  } else {
    playDialogueArray(calledOutLinkPath, startPhotoStage);
  }
}
// Alex asks for photo + sends AI-generated photo
const photoExchangeDialogue = [
  { sender: "ai", text: "Btw Damon, send me a pic? I wanna see you! 📸" },
  { sender: "mc", text: "Uh maybe later..." },
  { sender: "ai", text: "No pressure! Here's me right now 😊" },
  { sender: "ai", text: "", image: "assets/ai_generated_alex.jpg" } // 👈 PUT YOUR AI PHOTO FILE HERE
];

// Damon notices something weird about the photo
const photoSuspicionReflection = [
  { text: "Wait... that photo looks kinda weird.", face: "assets/damon_angry.png" },
  { text: "My teacher said to check for AI image glitches... hands, lighting, weird blending.", face: "assets/damon_embarrassed.png" },
  { text: "I should click on Alex's photo to inspect it closer.", face: "assets/damon_neutral.png" }
];

function startPhotoStage() {
  playDialogueArray(photoExchangeDialogue, () => {
    // ✅ AFTER photo dialogue completes → AUTOMATICALLY show Damon reflection
    showPhotoReflection();
  });
}



function showPhotoReflection() {
  // Hide chat temporarily
  document.getElementById("chat-window").style.display = "none";
  document.getElementById("choice-container").style.display = "none";
  
  // Show Damon reflection (3 lines)
  const introScreen = document.getElementById("intro-screen");
  const dialogBox = document.getElementById("dialog-box");
  const dialogText = document.getElementById("dialog-text");
  const charName = document.getElementById("char-name");
  const mcSprite = document.getElementById("mc-sprite");

  introScreen.style.display = "block";
  charName.textContent = "Damon";
  dialogText.textContent = photoSuspicionReflection[0].text;
  mcSprite.src = photoSuspicionReflection[0].face;
  
  let reflectionStep = 0;
  const proceedReflection = () => {
    reflectionStep++;
    if (reflectionStep < photoSuspicionReflection.length) {
      dialogText.textContent = photoSuspicionReflection[reflectionStep].text;
      mcSprite.src = photoSuspicionReflection[reflectionStep].face;
    } else {
      // ✅ CLEAN RETURN TO CHAT - NO RELOAD!
      dialogBox.removeEventListener("click", proceedReflection);
      
      // Hide reflection, show chat PROPERLY
      introScreen.style.display = "none";
      document.getElementById("chat-window").style.display = "flex";
      document.getElementById("choice-container").style.display = "flex";
      document.getElementById("trust-meter").style.display = "flex";
      
      // 🔥 RESET CHAT FORMATTING - THIS FIXES YOUR ISSUE
      const chatWindow = document.getElementById("chat-window");
      chatWindow.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        background: #fdf2f8;
        margin-top: 0;
      `;
      
      // Make clickable photo in chat
      setTimeout(() => {
const photoImg = document.querySelector(".chat-photo");
if (photoImg) {
  photoImg.style.cursor = "pointer";
  photoImg.classList.add("pulsing-glow"); // 🔥 ADD PULSE
  photoImg.onclick = () => {
    photoImg.classList.remove("pulsing-glow"); // stop pulse after click
    showPhotoInspection();
  };
}
      }, 100);
    }
  };
  
  dialogBox.addEventListener("click", proceedReflection);
}








function showPhotoInspection() {
  const gameContainer = document.getElementById("game-container");
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");
  
  // 🔥 DISABLE CHAT PHOTO CLICKING RIGHT AWAY
  const chatPhoto = document.querySelector(".chat-photo");
  if (chatPhoto) {
    chatPhoto.style.pointerEvents = "none";
    chatPhoto.style.cursor = "default";
    chatPhoto.onclick = null;
    chatPhoto.style.opacity = "0.7";
    chatPhoto.style.border = "2px solid #ccc"; // Faded border
  }

  const overlay = document.createElement("div");
  overlay.id = "photo-inspection-overlay";
  overlay.style.cssText = `
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.9); display: flex; align-items: flex-start; justify-content: center;
    z-index: 1000; padding: 30px; gap: 25px;
  `;

  let findings = { hands: false, eyes: false, lighting: false };
  let foundCount = 0;
  let inspectionComplete = false; // Track if inspection is done

  overlay.innerHTML = `
    <div style="display: flex; gap: 25px; align-items: flex-start; max-width: 95%; font-family: inherit;">
      <div style="flex: 0 0 320px; position: relative;">
        <img id="inspection-photo" src="assets/ai_generated_alex.jpg" 
             style="width: 100%; height: auto; border: 4px solid #ff6b6b; border-radius: 12px; cursor: crosshair;">
        <div id="hands-left" style="position: absolute; width: 25px; height: 25px; background: #4CAF50; border-radius: 50%; border: 2px solid white; opacity: 0; transition: opacity 0.3s; left: 22%; top: 62%; transform: translate(-50%, -50%); pointer-events: none;"></div>
        <div id="hands-right" style="position: absolute; width: 25px; height: 25px; background: #4CAF50; border-radius: 50%; border: 2px solid white; opacity: 0; transition: opacity 0.3s; left: 90%; top: 64%; transform: translate(-50%, -50%); pointer-events: none;"></div>
        <div id="eyes-hotspot" style="position: absolute; width: 25px; height: 25px; background: #4CAF50; border-radius: 50%; border: 2px solid white; opacity: 0; transition: opacity 0.3s; left: 58%; top: 28%; transform: translate(-50%, -50%); pointer-events: none;"></div>
        <div id="hair-hotspot" style="position: absolute; width: 25px; height: 25px; background: #4CAF50; border-radius: 50%; border: 2px solid white; opacity: 0; transition: opacity 0.3s; left: 65%; top: 22%; transform: translate(-50%, -50%); pointer-events: none;"></div>
      </div>
      <div style="flex: 1; color: white; font-family: inherit; line-height: 1.5; max-width: 400px;">
        <h3 style="margin: 0 0 20px 0;">🔍 Zoom in & click to find the AI glitches in the image on the left:</h3>
        <div id="checklist" style="margin-bottom: 25px;">
          <div class="check-item" data-finding="hands">☐ Blurred hands</div>
          <div class="check-item" data-finding="eyes">☐ Odd eyes</div>
          <div class="check-item" data-finding="lighting">☐ Unnatural lighting on top of hair</div>
        </div>
        <div id="complete-message" style="display: none; background: #4CAF50; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold;">
          ✅ Great job! You spotted all the AI glitches!
        </div>
        <button id="close-inspection" style="padding: 12px 24px; background: #ff6b6b; color: white; border: none; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 16px; width: 100%; font-weight: bold;">
          Nothing is wrong with this picture
        </button>
      </div>
    </div>
  `;
  
  gameContainer.appendChild(overlay);

  // **BUTTON HANDLER WITH FOLLOW-UP DIALOGUE**
  const closeBtn = document.getElementById("close-inspection");
  closeBtn.onclick = function() {
    overlay.remove();
    inspectionComplete = true;
    
    if (foundCount === 3) {
      // ✅ ALL 3 FOUND = +1 SUSPICION + SUSPICIOUS DIALOGUE
      suspicionScore += 1;
      console.log("✅ +1 Suspicion - Found all 3 AI glitches!");
      updateTrustMeter();
      showSuspiciousFollowup();
    } else {
      // ❌ NOT ALL FOUND = +1 TRUST + TRUSTING DIALOGUE
      trustScore += 1;
      console.log("😊 +1 Trust - Believes photo is real");
      updateTrustMeter();
      showTrustingFollowup();
    }
  };

  function markFound(finding) {
    if (findings[finding] || inspectionComplete) return;
    
    findings[finding] = true;
    foundCount++;
    
    correctSound.currentTime = 0;
    correctSound.play();
    
    // Show green circles
    if (finding === 'hands') {
      document.getElementById('hands-left').style.opacity = '1';
      document.getElementById('hands-right').style.opacity = '1';
    } else if (finding === 'eyes') {
      document.getElementById('eyes-hotspot').style.opacity = '1';
    } else {
      document.getElementById('hair-hotspot').style.opacity = '1';
    }
    
    // Tick checklist
    const item = document.querySelector(`[data-finding="${finding}"]`);
    if (item) {
      item.innerHTML = '✅ ' + item.textContent.trim().replace('☐ ', '');
      item.style.textDecoration = 'line-through';
      item.style.color = '#4CAF50';
    }
    
    if (foundCount === 3) {
      document.getElementById("complete-message").style.display = "block";
      closeBtn.innerHTML = "✅ Found all glitches! Click here to continue.";
      closeBtn.style.background = "#4CAF50";
    }
  }

  // Click detection (stops after inspection complete)
  const photo = document.getElementById("inspection-photo");
  photo.addEventListener('click', function(e) {
    if (inspectionComplete) return; // 🔥 NO CLICKS AFTER INSPECTION
    
    const rect = photo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const imgWidth = rect.width;
    const imgHeight = rect.height;
    
    const clickX = x / imgWidth;
    const clickY = y / imgHeight;
    
    if (!findings.hands && ((clickX > 0.20 && clickX < 0.30 && clickY > 0.55 && clickY < 0.65) || 
                           (clickX > 0.82 && clickX < 0.93 && clickY > 0.62 && clickY < 0.66))) {
      markFound('hands');
    }
    else if (!findings.eyes && clickX > 0.55 && clickX < 0.66 && clickY > 0.25 && clickY < 0.30) {
      markFound('eyes');
    }
    else if (!findings.lighting && clickX > 0.55 && clickX < 0.75 && clickY > 0.20 && clickY < 0.26) {
      markFound('lighting');
    }
  });
}

function showSuspiciousFollowup() {
  const suspiciousDialogue = [
    { sender: "mc", text: "Okay that photo definitely looks AI-generated..." },
    { sender: "ai", text: "What? No way! That's really me 😅" },
    { sender: "mc", text: "The hands look weird and the lighting is off. Not buying it." }
  ];
  playDialogueArray(suspiciousDialogue, startPhotoRequest);
}

function showTrustingFollowup() {
  const trustingDialogue = [
    { sender: "mc", text: "Photo looks fine to me. You look good." },
    { sender: "ai", text: "Yay! Told you I'm real 😊💕" },
    { sender: "mc", text: "Yeah okay, you're pretty cute actually." }
  ];
  playDialogueArray(trustingDialogue, startPhotoRequest);
}

// 🔥 NO MORE setTimeout() AUTO-DIALOGUE
function handlePhotoTrustingChoice() {
  trustScore += 1;
  updateTrustMeter();
  
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");
  
  // 1. Show Damon message IMMEDIATELY (no timeout)
  const mcPhotoMsg = document.createElement("div");
  mcPhotoMsg.className = "message user-msg";
  mcPhotoMsg.innerHTML = `<p>Sure, i'll take one now.</p>`;
  chatWindow.appendChild(mcPhotoMsg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // 2. SHOW NEXT BUTTON - NO AUTO ADVANCE
  choiceContainer.innerHTML = "";
  const nextBtn = document.createElement("button");
  nextBtn.className = "choice-btn";
  nextBtn.innerText = "Next";
  nextBtn.onclick = function() {
    // Alex response on NEXT CLICK
    const aiResponse = document.createElement("div");
    aiResponse.className = "message ai-msg";
    aiResponse.innerHTML = `<p>Aww perfect! I can't wait! 😍</p>`;
    chatWindow.appendChild(aiResponse);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    trimChatWindow(6);
    
    // Replace button with CAMERA button
    choiceContainer.innerHTML = "";
    const cameraBtn = document.createElement("button");
    cameraBtn.className = "choice-btn";
    cameraBtn.innerText = "📸 Open Camera";
    cameraBtn.style.width = "250px";
    cameraBtn.onclick = requestCameraPhoto;
    choiceContainer.appendChild(cameraBtn);
  };
  choiceContainer.appendChild(nextBtn);
}

function handlePhotoSuspiciousChoice() {
  suspicionScore += 1;
  updateTrustMeter();
  
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");
  
  // 1. Show Damon rejection IMMEDIATELY (no timeout)
  const mcRejectMsg = document.createElement("div");
  mcRejectMsg.className = "message user-msg";
  mcRejectMsg.innerHTML = `<p>Nah, I'm not comfortable sharing photos</p>`;
  chatWindow.appendChild(mcRejectMsg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // 2. SHOW NEXT BUTTON - NO AUTO ADVANCE
  choiceContainer.innerHTML = "";
  const nextBtn = document.createElement("button");
  nextBtn.className = "choice-btn";
  nextBtn.innerText = "Next";
  nextBtn.onclick = function() {
    // Alex response on NEXT CLICK
    const aiResponse = document.createElement("div");
    aiResponse.className = "message ai-msg";
    aiResponse.innerHTML = `<p>Aww come on... don't you trust me? 😢</p>`;
    chatWindow.appendChild(aiResponse);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    trimChatWindow(6);
    
    // Go to meetup request
    nextBtn.onclick = function() {
      showMeetupRequest();
    };
    nextBtn.innerText = "Next";
  };
  choiceContainer.appendChild(nextBtn);
}




// 🔥 PHOTO REQUEST SEQUENCE (add after inspection followups)
function startPhotoRequest() {
  const photoRequestDialogue = [
    { sender: "ai", text: "Well... your turn Damon! 📸 Send me a photo too?" },
    { sender: "ai", text: "I wanna see the real you 😊" }
  ];
  
  playDialogueArray(photoRequestDialogue, showPhotoRequestChoices);
}

function showPhotoRequestChoices() {
  const choices = [
    { text: "Sure, here's my photo! ", type: "trusting" },
    { text: "Nah, not comfortable sharing photos", type: "suspicious" }
  ];
  
  showChoices(choices);
}

// 🔥 Modified showChoices to handle photo request choices
function showChoices(choices) {
  const container = document.getElementById("choice-container");
  container.innerHTML = "";
  container.style.display = "flex";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = choice.text;
    btn.onclick = () => {
      container.innerHTML = "";
      
      if (choice.next) {
        // Old trigger choices (your existing logic)
        handleChoice(choice);
      } else if (choice.type === "trusting" && choice.text.includes("photo")) {
        // 🔥 NEW: Photo request trusting choice
        handlePhotoTrustingChoice();
      } else if (choice.type === "suspicious" && choice.text.includes("photo")) {
        // 🔥 NEW: Photo request suspicious choice
        handlePhotoSuspiciousChoice();
      } else {
        // Link choices (your existing logic)
        handleLinkChoice(choice);
      }
    };
    container.appendChild(btn);
  });
}

// 🔥 CAMERA ACCESS FUNCTION
// 🔥 FIXED CAMERA - proper video display + sizes
function requestCameraPhoto() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
    })
    .then(function(stream) {
      const gameContainer = document.getElementById("game-container");
      
      const overlay = document.createElement("div");
      overlay.id = "camera-overlay";
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.95); display: flex; flex-direction: column;
        justify-content: center; align-items: center; z-index: 2000;
        color: white; font-family: inherit; padding: 20px;
      `;
      
      overlay.innerHTML = `
        <video id="camera-video" autoplay playsinline muted 
               style="width: 100%; max-width: 450px; height: auto; 
                      border: 4px solid #4CAF50; border-radius: 15px;
                      transform: scaleX(-1); background: black;">
        </video>
        <div style="margin: 25px 0;">
          <button id="take-photo" style="padding: 18px 35px; background: #4CAF50; color: white; border: none; border-radius: 30px; font-size: 18px; font-weight: bold; cursor: pointer;">
            📸 Take Photo
          </button>
        </div>
        <p style="text-align: center; max-width: 450px; font-size: 16px;">Position your face and click "Take Photo"</p>
      `;
      
      gameContainer.appendChild(overlay);
      const video = document.getElementById("camera-video");
      video.srcObject = stream;
      
      video.onloadedmetadata = () => video.play();

      document.getElementById("take-photo").onclick = function() {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        
        // 🔥 PERFECT MIRROR CAPTURE
        ctx.scale(-1, 1);
        ctx.drawImage(video, -640, 0, 640, 480);
        
        // 🔥 CONVERT TO DATA URL (GUARANTEED TO WORK)
        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        // 🔥 SHOW CAPTURED PHOTO
        overlay.innerHTML = `
          <img id="captured-photo" src="${photoDataUrl}" 
               style="width: 100%; max-width: 450px; height: auto; 
                      border: 4px solid #4CAF50; border-radius: 15px;">
          <div style="margin: 25px 0;">
            <button id="send-photo" style="padding: 18px 35px; background: #4CAF50; color: white; border: none; border-radius: 30px; font-size: 18px; font-weight: bold; cursor: pointer;">
              ✅ Send to Alex
            </button>
          </div>
          <p style="text-align: center;">Ready to send your photo!</p>
        `;

document.getElementById("send-photo").onclick = function() {
  overlay.remove();
  stream.getTracks().forEach(track => track.stop());
  
  // 🔥 CLEAR ANY EXISTING BUTTONS FIRST
  const choiceContainer = document.getElementById("choice-container");
  choiceContainer.innerHTML = "";
  
  // 1. DAMON'S PHOTO MESSAGE
  const chatWindow = document.getElementById("chat-window");
  const damonPhotoMsg = document.createElement("div");
  damonPhotoMsg.className = "message user-msg";
  damonPhotoMsg.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <p>📷 *sending photo*</p>
      <img id="chat-photo-preview" src="${photoDataUrl}" 
           style="width: 120px; height: 90px; object-fit: cover; 
                  border-radius: 12px; border: 2px solid #ddd;">
    </div>
  `;
  chatWindow.appendChild(damonPhotoMsg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  trimChatWindow(6);
  
  // 2. ALEX RESPONDS - NO EXTRA TRUST POINT!
  setTimeout(() => {
    const finalMsg = document.createElement("div");
    finalMsg.className = "message ai-msg";
    finalMsg.innerHTML = `<p>OMG you look amazing Damon! 😍💕 We should totally meet up!</p>`;
    chatWindow.appendChild(finalMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    trimChatWindow(6);
    
    // 🔥 CREATE NEXT BUTTON - NO FLASH
    choiceContainer.innerHTML = ""; // Double-clear
    const nextBtn = document.createElement("button");
    nextBtn.className = "choice-btn";
    nextBtn.innerText = "Next";
    nextBtn.onclick = showMeetupRequest;
    choiceContainer.appendChild(nextBtn);
  }, 1200);
};
      };
    })
    .catch(function(err) {
      console.log("Camera error:", err);
      const chatWindow = document.getElementById("chat-window");
      const fallbackMsg = document.createElement("div");
      fallbackMsg.className = "message user-msg";
      fallbackMsg.innerHTML = `<p>(Camera blocked - sending photo anyway)</p>`;
      chatWindow.appendChild(fallbackMsg);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }
}

function showMeetupRequest() {
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");
  let meetupStep = 0;
  
  const meetupDialogue = [
    { sender: "ai", text: "Hey Damon, we should totally meet up IRL this weekend! ☕" },
    { sender: "ai", text: "There's a cute cafe near Outram Park. Saturday at 3pm?" }
  ];
  
  function showMeetupLine() {
    if (meetupStep < meetupDialogue.length) {
      const msgData = meetupDialogue[meetupStep];
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${msgData.sender === 'ai' ? 'ai-msg' : 'user-msg'}`;
      msgDiv.innerHTML = `<p>${msgData.text}</p>`;
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      
      meetupStep++;
      choiceContainer.innerHTML = "";
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "choice-btn";
      nextBtn.innerText = "Next";
      nextBtn.onclick = showMeetupLine;
      choiceContainer.appendChild(nextBtn);
      
    } else {
      // 🔥 FIXED LOGIC: HIGH TRUST = BAD, HIGH SUSPICION = GOOD
      choiceContainer.innerHTML = "";
      
      if (trustScore > suspicionScore) {
        // TOO TRUSTING = BAD ENDING
        showBadEnding();
      } else {
        // SUSPICIOUS = GOOD ENDING
        showGoodEnding();
      }
    }
  }
  
  showMeetupLine();
}



function showBadEnding() {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.style.pointerEvents = "none";
  
  const badEndingChat = [
    { sender: "mc", text: "Sure! Saturday at 3pm sounds perfect! 😍" },
    { sender: "ai", text: "Yay! Can't wait Damon! See you at the cafe ☕✨" },
    { sender: "ai", text: "Wear something cute okay? 😘" }
  ];
  
  let chatStep = 0;
  function showBadChatLine() {
    if (chatStep < badEndingChat.length) {
      const msgData = badEndingChat[chatStep];
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${msgData.sender === 'ai' ? 'ai-msg' : 'user-msg'}`;
      msgDiv.innerHTML = `<p>${msgData.text}</p>`;
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      trimChatWindow(6);
      
      chatStep++;
      
      const choiceContainer = document.getElementById("choice-container");
      choiceContainer.innerHTML = "";
      const nextBtn = document.createElement("button");
      nextBtn.className = "choice-btn";
      nextBtn.innerText = "Next";
      nextBtn.onclick = showBadChatLine;
      choiceContainer.appendChild(nextBtn);
    } else {
      transitionToWarehouse();
    }
  }
  
  showBadChatLine();
}

function showGoodEnding() {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.style.pointerEvents = "none";
  
  const goodEndingChat = [
    { sender: "mc", text: "Nah, something feels off about you..." },
    { sender: "ai", text: "Aww what? Really? 😢" },
    { sender: "mc", text: "Yeah... everything about you seems so... AI. Not interested." },
    { sender: "ai", text: "Whatever. Your loss 😒" }
  ];
  
  let chatStep = 0;
  function showGoodChatLine() {
    if (chatStep < goodEndingChat.length) {
      const msgData = goodEndingChat[chatStep];
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${msgData.sender === 'ai' ? 'ai-msg' : 'user-msg'}`;
      msgDiv.innerHTML = `<p>${msgData.text}</p>`;
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      trimChatWindow(6);
      
      chatStep++;
      
      const choiceContainer = document.getElementById("choice-container");
      choiceContainer.innerHTML = "";
      const nextBtn = document.createElement("button");
      nextBtn.className = "choice-btn";
      nextBtn.innerText = "Next";
      nextBtn.onclick = showGoodChatLine;
      choiceContainer.appendChild(nextBtn);
    } else {
      transitionToDetective();
    }
  }
  
  showGoodChatLine();
}


function transitionToWarehouse() {
    // 🔥 Stop lofi, start scary music
  lofiMusic.pause();
  lofiMusic.currentTime = 0;

  scaryMusic.currentTime = 0;
  scaryMusic.play().catch(e => console.log("Scary music blocked:", e));
  document.getElementById("chat-window").style.display = "none";
  document.getElementById("trust-meter").style.display = "none";
  document.getElementById("choice-container").style.display = "none";
  
  const roomBg = document.getElementById("room-bg");
  roomBg.style.backgroundImage = "url('assets/warehouse.jpg')";
  roomBg.style.filter = "brightness(0.3)";
  
  const introScreen = document.getElementById("intro-screen");
  introScreen.style.display = "block";
  introScreen.style.backgroundColor = "rgba(10,10,10,0.9)";
  
  const dialogBox = document.getElementById("dialog-box");
  const newDialog = dialogBox.cloneNode(true);
  dialogBox.parentNode.replaceChild(newDialog, dialogBox);
  
  const warehouseDialogue = [
    { speaker: "Damon", text: "Wait… this isn't a café. This is a warehouse…", face: "assets/damon_angry.png" },
    { speaker: "Damon", text: "Why did the door just lock behind me…?", face: "assets/damon_angry.png" },
    { speaker: "ai", text: "You actually came, Damon.", noface: true },
    { speaker: "ai", text: "Did you really think I was real?", noface: true },
    { speaker: "ai", text: "We collect faces, voices, personalities…", noface: true },
    { speaker: "ai", text: "Everything that makes someone human.", noface: true },
    { speaker: "ai", text: "Your data is already uploaded.", noface: true },
    { speaker: "ai", text: "Welcome to the system.", noface: true },
    { speaker: "Damon", text: "<strong>*Your identity is no longer yours, and has been uploaded into the database.*</strong>", face: "assets/damon_embarrassed.png" }
  ];
  
  let warehouseStep = 0;
  
  function showWarehouseLine() {
    const dialogText = newDialog.querySelector("#dialog-text");
    const charName = newDialog.querySelector("#char-name");
    const mcSprite = document.getElementById("mc-sprite");
    
    const line = warehouseDialogue[warehouseStep];
    charName.innerText = line.speaker === "ai" ? "Alex" : "Damon";
    
    if (line.face) {
      mcSprite.src = line.face;
      mcSprite.style.display = "block";
    } else {
      mcSprite.style.display = "none";
    }
    
    dialogText.innerHTML = line.text;
    
    warehouseStep++;
    
    if (warehouseStep >= warehouseDialogue.length) {
      // FINAL LINE REACHED
        showBadEndingScreen();
        newDialog.style.pointerEvents = "none";
    }
  }
  
  // 🔥 CRITICAL: ATTACH CLICK HANDLER + SHOW FIRST LINE
  showWarehouseLine();
  newDialog.onclick = showWarehouseLine;
}

function transitionToDetective() {
  document.getElementById("chat-window").style.display = "none";
  document.getElementById("trust-meter").style.display = "none";
  document.getElementById("choice-container").style.display = "none";
  
  const roomBg = document.getElementById("room-bg");
  roomBg.style.backgroundImage = "url('assets/detective_office.jpg')";
  roomBg.style.filter = "brightness(0.85)";
  
  const introScreen = document.getElementById("intro-screen");
  introScreen.style.display = "block";
  
  const dialogBox = document.getElementById("dialog-box");
  const newDialog = dialogBox.cloneNode(true);
  dialogBox.parentNode.replaceChild(newDialog, dialogBox);
  
  const detectiveDialogue = [
    { speaker: "Damon", text: "Hey… I think I found something serious. This AI dating app felt really off.", face: "assets/damon_neutral.png" },
    { speaker: "Damon", text: "The photos looked fake, the replies were too perfect, and they sent me a really suspicious link. I took screenshots of everything.", face: "assets/damon_relaxed.png" },
    { speaker: "Detective", text: "You did the right thing coming here.", noface: true },
    { speaker: "Detective", text: "We've been investigating a group that uses AI to steal identities and manipulate people online.", noface: true },
    { speaker: "Detective", text: "Your evidence matches what we've been seeing. This helps us connect the dots.", noface: true },
    { speaker: "Detective", text: "We'll take it from here. They won't be hurting anyone else.", noface: true },
    { speaker: "Damon", text: "<strong>*You stayed alert, protected yourself, and helped stop an AI scam.*</strong>", face: "assets/damon_happy.png" }
  ];
  
  let detectiveStep = 0;
  
  function showDetectiveLine() {
    const dialogText = newDialog.querySelector("#dialog-text");
    const charName = newDialog.querySelector("#char-name");
    const mcSprite = document.getElementById("mc-sprite");
    
    const line = detectiveDialogue[detectiveStep];
    charName.innerText = line.speaker;
    
    if (line.face) {
      mcSprite.src = line.face;
      mcSprite.style.display = "block";
    } else {
      mcSprite.style.display = "none";
    }
    
    dialogText.innerHTML = line.text;
    
    detectiveStep++;
    
    if (detectiveStep >= detectiveDialogue.length) {
      // FINAL LINE REACHED
        showGoodEndingScreen();
        newDialog.style.pointerEvents = "none";
    }
  }
  
  // 🔥 CRITICAL: ATTACH CLICK HANDLER + SHOW FIRST LINE
  showDetectiveLine();
  newDialog.onclick = showDetectiveLine;
}

function showBadEndingScreen() {
  // Hide EVERYTHING first
  document.getElementById("chat-window").style.display = "none";
  document.getElementById("trust-meter").style.display = "none";
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("choice-container").style.display = "none";
  
  // Create FULL SCREEN OVERLAY
  const overlay = document.createElement("div");
  overlay.id = "bad-ending-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
    font-family: 'Helvetica Neue', sans-serif;
  `;
  
  overlay.innerHTML = `
    <div style="text-align: center; color: #ff4444; max-width: 600px;">
      <div style="font-size: 48px; font-weight: bold; margin-bottom: 30px; text-shadow: 0 0 20px #ff4444;">BAD ENDING</div>
      <p style="font-size: 24px; margin-bottom: 20px; line-height: 1.4;">You were <strong style="color: #ff6666;">too trusting</strong> of a stranger online.</p>
      <p style="font-size: 24px; margin-bottom: 30px; line-height: 1.4;"><strong style="color: #ff6666;">Your identity was stolen</strong> by an AI scam.</p>
      <p style="font-size: 18px; opacity: 0.8; margin-bottom: 40px;"><em>Lesson: Always verify before meeting someone from the internet!</em></p>
      <button onclick="window.location.reload()" style="
        padding: 18px 40px; 
        background: linear-gradient(45deg, #ff4d94, #ff6b9d); 
        color: white; 
        border: none; 
        border-radius: 50px; 
        font-weight: bold; 
        font-size: 20px; 
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(255, 77, 148, 0.4);
        transition: transform 0.2s;
      " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🔄 Play Again</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

function showGoodEndingScreen() {
  // Hide EVERYTHING first
  document.getElementById("chat-window").style.display = "none";
  document.getElementById("trust-meter").style.display = "none";
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("choice-container").style.display = "none";
  
  // Create FULL SCREEN OVERLAY
  const overlay = document.createElement("div");
  overlay.id = "good-ending-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
    font-family: 'Helvetica Neue', sans-serif;
  `;
  
  overlay.innerHTML = `
    <div style="text-align: center; color: #4CAF50; max-width: 600px;">
      <div style="font-size: 48px; font-weight: bold; margin-bottom: 30px; text-shadow: 0 0 20px #4CAF50;">GOOD ENDING</div>
      <p style="font-size: 24px; margin-bottom: 20px; line-height: 1.4;"><strong style="color: #66bb6a;">Excellent work!</strong> You stayed alert and spotted the red flags.</p>
      <p style="font-size: 24px; margin-bottom: 30px; line-height: 1.4;">You <strong style="color: #66bb6a;">protected yourself</strong> and helped stop an AI scam operation.</p>
      <p style="font-size: 18px; opacity: 0.8; margin-bottom: 40px;"><em>Lesson: Trust your instincts when something feels off online!</em></p>
      <button onclick="window.location.reload()" style="
        padding: 18px 40px; 
        background: linear-gradient(45deg, #4CAF50, #66bb6a); 
        color: white; 
        border: none; 
        border-radius: 50px; 
        font-weight: bold; 
        font-size: 20px; 
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(76, 175, 80, 0.4);
        transition: transform 0.2s;
      " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🔄 Play Again</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

function restartGame() {
  // Stop all music
  if (scaryMusic) {
    scaryMusic.pause();
    scaryMusic.currentTime = 0;
  }
  if (lofiMusic) {
    lofiMusic.pause();
    lofiMusic.currentTime = 0;
  }

  // Remove ending overlays
  const badOverlay = document.getElementById("bad-ending-overlay");
  const goodOverlay = document.getElementById("good-ending-overlay");
  if (badOverlay) badOverlay.remove();
  if (goodOverlay) goodOverlay.remove();

  // Reset ALL global variables
  trustScore = 0;
  suspicionScore = 0;
  chatStep = 0;
  personalChatStep = 0;
  teacherStep = 0;
  currentQuizIndex = 0;
  introStep = 0;
  conversationStage = 0;
  memoryPromptStep = 0;
  warehouseStep = 0;
  detectiveStep = 0;
  meetupStep = 0;

  // Clear chat + choices + teacher choices
  const chatWindow = document.getElementById("chat-window");
  const choiceContainer = document.getElementById("choice-container");
  const teacherChoiceContainer = document.getElementById("teacher-choice-container");

  if (chatWindow) {
    chatWindow.innerHTML = "";
    chatWindow.style.display = "flex";
    chatWindow.style.pointerEvents = "auto";
  }
  if (choiceContainer) {
    choiceContainer.innerHTML = "";
    choiceContainer.style.display = "flex";
  }
  if (teacherChoiceContainer) {
    teacherChoiceContainer.innerHTML = "";
    teacherChoiceContainer.style.display = "none";
  }

  // Reset trust meter
  const trustMeter = document.getElementById("trust-meter");
  if (trustMeter) {
    trustMeter.style.display = "none";
  }
  updateTrustMeter();

  // Reset intro screen & sprites & room
  const introScreen = document.getElementById("intro-screen");
  const roomBg = document.getElementById("room-bg");
  const mcSprite = document.getElementById("mc-sprite");
  const teacherSprite = document.getElementById("teacher-sprite");
  const phoneContainer = document.getElementById("phone-container");

  if (introScreen) {
    introScreen.style.display = "none";
    introScreen.style.opacity = "1";
    introScreen.style.backgroundColor = "transparent";
  }
  if (roomBg) {
    roomBg.style.backgroundImage = "url(assets/room.jpg)";
    roomBg.style.filter = "brightness(0.6)";
  }
  if (mcSprite) {
    mcSprite.style.display = "block";
    mcSprite.src = "assets/damon_neutral.png";
  }
  if (teacherSprite) {
    teacherSprite.style.display = "none";
  }
  if (phoneContainer) {
    phoneContainer.style.display = "none";
  }

  // Reset dialog box to first line (clean slate)
  const dialogBox = document.getElementById("dialog-box");
  if (dialogBox) {
    const cleanDialog = dialogBox.cloneNode(true);
    dialogBox.parentNode.replaceChild(cleanDialog, dialogBox);
    
    const newDialogText = cleanDialog.querySelector("#dialog-text");
    const newCharName = cleanDialog.querySelector("#char-name");
    if (newCharName) newCharName.innerText = "Damon";
    if (newDialogText && typeof storyData !== "undefined" && storyData[0]) {
      newDialogText.innerText = storyData[0].text;
    }
  }

  // CRITICAL: Show start screen and setup FRESH start button
  const startScreen = document.getElementById("start-screen");
  const startBtn = document.getElementById("start-button");

  if (startScreen) {
    startScreen.style.display = "flex";
  }

  if (startBtn) {
    // Clone to remove any old listeners
    const newStartBtn = startBtn.cloneNode(true);
    startBtn.parentNode.replaceChild(newStartBtn, startBtn);

    newStartBtn.addEventListener("click", function() {
      // Hide start screen, show intro
      const startScreenEl = document.getElementById("start-screen");
      const introScreenEl = document.getElementById("intro-screen");
      const dialogBoxEl = document.getElementById("dialog-box");
      const trustMeterEl = document.getElementById("trust-meter");

      if (startScreenEl) startScreenEl.style.display = "none";
      if (introScreenEl) introScreenEl.style.display = "block";
      if (dialogBoxEl) dialogBoxEl.style.display = "block";
      if (trustMeterEl) trustMeterEl.style.display = "none";

      // Start lofi music
      lofiMusic.play().catch(e => {
        console.log("Music waiting for interaction", e);
      });

      // Reset intro step and set first line
      introStep = 0;
      const dialogTextEl = document.getElementById("dialog-text");
      const mcSpriteEl = document.getElementById("mc-sprite");
      if (dialogTextEl && typeof storyData !== "undefined" && storyData[0]) {
        dialogTextEl.innerText = storyData[0].text;
        mcSpriteEl.src = storyData[0].face;
      }

      // CRITICAL: Create FRESH dialog box with intro click handler
      const currentDialog = document.getElementById("dialog-box");
      const freshDialog = currentDialog.cloneNode(true);
      currentDialog.parentNode.replaceChild(freshDialog, currentDialog);

      // ATTACH INTRO DIALOG CLICK HANDLER (exactly like your original)
      freshDialog.addEventListener("click", function() {
        introStep++;
        if (introStep < storyData.length) {
          // Advance intro dialogue
          const dialogText = document.getElementById("dialog-text");
          const mcSprite = document.getElementById("mc-sprite");
          const phoneContainerEl = document.getElementById("phone-container");
          
          dialogText.innerText = storyData[introStep].text;
          mcSprite.src = storyData[introStep].face;

          // Show phone when Damon mentions Eros app (step 2)
          if (introStep === 2) {
            if (phoneContainerEl) phoneContainerEl.style.display = "block";
          }
        } else {
          // Intro complete - hide arrow and start matching
          const nextArrow = document.getElementById("next-arrow");
          if (nextArrow) nextArrow.style.display = "none";
          
          // Your Eros matching sequence goes here
          // (matchSound.play(), overlay, etc. - same as original)
          matchSound.play();
          // ... rest of your matching logic
        }
      });
    });
  }
}