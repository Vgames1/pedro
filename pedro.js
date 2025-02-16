// pedro.js
document.addEventListener("DOMContentLoaded", function () {
    const storyContainer = document.getElementById("story");
    const choicesContainer = document.getElementById("choices");

    function showScene(sceneKey) {
        const scene = scenes[sceneKey];
        if (!scene) {
            console.error("Scene not found:", sceneKey);
            return;
        }

        storyContainer.innerHTML = scene.text;
        choicesContainer.innerHTML = "";

        if (scene.choices) {
            scene.choices.forEach(choice => {
                const button = document.createElement("button");
                button.innerText = choice.text;
                button.onclick = () => showScene(choice.nextScene);
                choicesContainer.appendChild(button);
            });
        }
    }

    const endingStyles = {
        "foundDead": "color: red; font-size: 30px; font-weight: bold;",
        "foundInjured": "color: orange; font-size: 30px; font-weight: bold;",
        "foundButWontLeave": "color: gray; font-size: 30px; font-weight: bold;",
        "pedroInjured": "color: blue; font-size: 30px; font-weight: bold;"
    };

    const scenes = {
        start: {
            text: "Pedro Webster embarks on a dangerous journey to find his missing older brother, Zavier. Rumors swirl about strange happenings in the area where he disappeared. Some say they saw him near the abandoned mines, while others claim he was last seen in the dense forests outside town. As night falls, the wind howls through the trees, and the distant hoot of an owl sends chills down Pedro's spine. Every decision he makes could lead to salvation—or disaster. Where should he begin his search?",
            choices: [
                { text: "Search the mines", nextScene: "mines" },
                { text: "Ask around in the nearby town", nextScene: "town" }
            ]
        },
        mines: {
            text: "Pedro stands before the mines, their black entrance swallowing all light. A chill runs down his spine as he steps inside. The air is thick with the scent of damp earth. Suddenly, a rock shifts behind him. He spins around, heart pounding. Could it be Zavier? Or something else lurking in the darkness? He must decide his next move carefully.",
            choices: [
                { text: "Follow the noises deeper into the mine", nextScene: "deepMines" },
                { text: "Examine the ground for clues", nextScene: "clues" }
            ]
        },
        town: {
            text: "The town square is alive with murmurs as Pedro pushes through the crowd. A group of merchants gossip about recent disappearances, speaking in hushed tones. An elderly man watches Pedro closely, his eyes filled with unspoken knowledge. 'You’re looking for that boy, aren’t you?' he mutters. 'I saw him heading towards the forest just before sunset. But if I were you, I’d stay far away from that place.' The words hang heavy in the air. Should Pedro heed the warning or press on?",
            choices: [
                { text: "Go to the forest", nextScene: "forest" },
                { text: "Visit the tavern for more information", nextScene: "tavern" }
            ]
        },
        deepMines: {
            text: "Pedro's footsteps echo as he descends into the mine's depths. The air grows colder, and shadows dance along the damp walls. Then, he spots something—a figure slumped against a rock. A wave of dread washes over him as he realizes it's his brother. But is he still alive?",
            choices: [
                { text: "Check if he's breathing", nextScene: "foundDead" },
                { text: "Call for help", nextScene: "foundInjured" }
            ]
        },
        clues: {
            text: "Pedro scans the ground and spots something—a broken watch lying among the scattered debris. He picks it up, his fingers trembling. It’s Zavier’s. Nearby, footprints trail off toward the mine’s exit. His heart pounds. Did Zavier escape? Or was he being chased? The only way to know is to follow the tracks.",
            choices: [
                { text: "Follow the footprints into the forest", nextScene: "forest" },
                { text: "Return to town to gather more information", nextScene: "town" }
            ]
        },
        forest: {
            text: "Pedro pushes through thick underbrush, the sounds of the night filling his ears. An eerie mist clings to the trees, distorting shadows into looming figures. Then—a cry! He sprints forward and finds Zavier, his face pale and wounded. But as Pedro kneels beside him, Zavier shakes his head. 'I can't leave,' he whispers. 'Not yet.' The weight of the moment settles on Pedro. He must act fast.",
            choices: [
                { text: "Convince Zavier to come home", nextScene: "foundButWontLeave" },
                { text: "Try to carry him back", nextScene: "pedroInjured" }
            ]
        },
        tavern: {
            text: "Inside the tavern, the air is thick with the scent of ale and tobacco. A bartender wipes a glass, eyeing Pedro warily. 'Looking for someone?' he asks. Pedro nods, and the bartender leans in. 'That kid got into trouble here. Someone dragged him out, bleeding. Said they were taking him to a shack outside town.' Pedro’s heart pounds. If he’s still alive, he doesn’t have much time.",
            choices: [
                { text: "Go to the shack", nextScene: "foundInjured" }
            ]
        },
        foundDead: {
            text: `<span style='${endingStyles.foundDead}'>Pedro collapses as he finds Zavier’s lifeless body. The weight of grief crushes him. His journey ends in sorrow.</span>`,
            choices: []
        },
        foundInjured: {
            text: `<span style='${endingStyles.foundInjured}'>Pedro finds Zavier, injured but alive. He quickly calls for help, ensuring his brother survives. The nightmare is over, but scars remain.</span> <br><br> Pedro’s phone suddenly rings. A chilling voice says, 'Your mother has been taken. If you want to save her, follow the trail.' <br><br> <a href='https://vgames1.github.io/season2?character=pedro[game data]' target='_blank'>Click here for Season 2</a>`,
            choices: []
        }
    };

    document.getElementById('playButton').addEventListener('click', function() {
        document.querySelector('.container').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
        showScene("start");
    });

    document.getElementById('submitCode').addEventListener('click', function() {
        const code = document.getElementById('codeInput').value;
        if (code === "739572") {
            customAlert("Correct Code! Proceeding to the next scene...");
        } else {
            customAlert("Incorrect Code! Try again.");
        }
    });

    function customAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.style.position = 'fixed';
        alertBox.style.top = '50%';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translate(-50%, -50%)';
        alertBox.style.backgroundColor = '#fff';
        alertBox.style.color = '#000';
        alertBox.style.padding = '20px';
        alertBox.style.borderRadius = '5px';
        alertBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        alertBox.style.zIndex = '1000';
        alertBox.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'OK';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.backgroundColor = '#000';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '3px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(alertBox);
        });

        alertBox.appendChild(closeButton);
        document.body.appendChild(alertBox);
    }
});
