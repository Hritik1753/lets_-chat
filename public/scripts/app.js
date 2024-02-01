const emojiSelectorIcon = document.getElementById('emojiSelectorIcon');
const emojiSelector = document.getElementById('emojiSelector');

const emojiList = document.getElementById('emojiList');
const emojiSearch = document.getElementById('emojiSearch');

const chatInput = document.getElementById('messageInp');

emojiSelectorIcon.addEventListener('click', () => {
    emojiSelector.classList.toggle('active');
})

fetch('https://emoji-api.com/emojis?access_key=121ea65c350b5e7f257bf05ee9362bee9294d8e6')
    .then(res => res.json())
    .then(data => loadEmoji(data))

function loadEmoji(data) {
    data.forEach(emoji => {
        let li = document.createElement('li');
        li.setAttribute('emoji-name', emoji.slug);
        li.textContent = emoji.character;
        emojiList.appendChild(li);

         // Add click event listener to each emoji
         li.addEventListener('click', () => {
            // Append the clicked emoji to the chat input
            chatInput.value += emoji.character;
        });

        })
}
emojiSearch.addEventListener('keyup', e => {
    let value = e.target.value;
    let emojis = document.querySelectorAll('#emojiList li');
    
    emojis.forEach(emoji => {
        if (emoji.getAttribute('emoji-name').toLowerCase().includes(value)) {
            emoji.style.display = 'flex';
        }
        else {
            emoji.style.display = 'none';
        }
             
     })

    })
