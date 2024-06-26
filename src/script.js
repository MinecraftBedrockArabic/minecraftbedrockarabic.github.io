const links = {
  "1165-banner-markers.html": "Banner Markers",
  "1976-player-heads-addon.html": "Player Heads",
  "1652-replay-mod.html": "Replay Mod",
  "1253-arabic-language-fix.html": "Arabic Language Fix",
  "1248-clickable-signs.html": "Clickable Signs",
};

const posts = {
  mods: [
    {
      title: 'Player Heads Add-on',
      description: 'This add-on allows you to add Player Heads to the game, giving you the ability to customize your game and world.',
      link: 'https://modbay.org/mods/1976-player-heads-addon.html',
      coverImage: 'https://modbay.org/uploads/posts/2024-05/player-heads-addon-main-cover.png'
    },
    {
      title: 'Replay Mod [1.21]: BETA',
      description: 'This add-on allows you to record in-game actions and replay it later.',
      link: 'https://modbay.org/mods/1652-replay-mod.html',
      coverImage: 'https://modbay.org/uploads/posts/2024-03/replay-mod-main-cover.png'
    },
    {
      title: 'Arabic Language Fix [1.20 → 1.21]',
      description: 'This add-on fixes the inverted syntax of the Arabic language within the game. هذا المود (إضافة او ادون) يقوم بإصلاح شكل اللغة العربية المعكوس داخل اللعبة',
      link: 'https://modbay.org/mods/1253-arabic-language-fix.html',
      coverImage: 'https://modbay.org/uploads/posts/2023-11/arabic-language-fix-pack-main-cover.jpg'
    },
    {
      title: 'Clickable Signs [1.20.4x | 1.20.6x]',
      description: 'This addon allows you to make signs clickable. You can also add commands that run when clicking the sign (you can add them only in creative).',
      link: 'https://modbay.org/mods/1248-clickable-signs.html',
      coverImage: 'https://modbay.org/uploads/posts/2023-10/clickable-signs-main-cover.png'
    },
    {
      title: 'Banner Markers [1.20.1x | 1.20.7x]',
      description: 'Did you wish that you can place markers in a map? This add-on adds a parity feature from Minecraft: Java Edition. This feature allows you to put markers in your map using banners.',
      link: 'https://modbay.org/mods/1165-banner-markers.html',
      coverImage: 'https://modbay.org/uploads/posts/2023-10/banner-markers-main-cover.png'
    }
  ],
  others: [
    {
      title: "ModBay Feed Discord App",
      description: "This Bot allows you to receive notifications from ModBay when a creator you are subscribed to submits a new mod or a new update. you can also subscribe to comment section of any creator.",
      link: "#",
      coverImage: "./src/assets/modBay.png",
    },
  ],
  friends: [
    {
      title: "Mevo",
      description: "Minecraft Bedrock Add-on Creator.",
      link: "https://modbay.org/user/Mevo/",
      coverImage: "./src/assets/me.jpg",
    },
    {
      title: "MZ3G",
      description: "Minecraft Bedrock Add-on Creator.",
      link: "https://modbay.org/user/MZ3G/",
      coverImage: "./src/assets/mz.jpg",
    },
    {
      title: "ShadowGem100k",
      description: "Minecraft Bedrock Add-on Creator.",
      link: "https://modbay.org/user/ShadowGem100k/",
      coverImage: "./src/assets/sh.jpg",
    },
  ],
  social: [
    {
      title: "Discord Server",
      description: "This is my official Discord Server. It is open for everyone.",
      link: "https://discord.gg/6z8ZPUdVTT",
      coverImage: "./src/assets/dis.jpg",
    },
    {
      title: "github",
      description: "My github account. I am new to GitHub but feel free to check out my projects.",
      link: "https://github.com/MinecraftBedrockArabic",
      coverImage: "./src/assets/git.jpg",
    },
  ]
}

document.addEventListener("DOMContentLoaded", function () {
  const navItem = document.querySelectorAll(".navbar-item");
  projects();
  for (const item of navItem) {
    item.addEventListener("click", () => {
      if (item.classList.contains("navbar-selected")) return;
      navItem.forEach((item) => item.classList.remove("navbar-selected"));
      item.classList.add("navbar-selected");
      const fn = {
        Projects: projects,
        Others: others,
        Social: social,
        Friends: friends,
      }[item.textContent];
      if (fn) fn();
    });
  }


});

function projects() {
  const img = document.querySelector(".img-title");
  img.alt = "Projects";
  img.src = "./src/assets/pro.png";
  addPosts(posts.mods);
}

function others() {
  const img = document.querySelector(".img-title");
  img.alt = "Others";
  img.src = "./src/assets/oth.png";

  addPosts(posts.others);
}

function friends() {
  const img = document.querySelector(".img-title");
  img.alt = "Friends";
  img.src = "./src/assets/fre.png";
  addPosts(posts.friends);
}

function social() {
  const img = document.querySelector(".img-title");
  img.alt = "Social";
  img.src = "./src/assets/soc.png";
  addPosts(posts.social);
}

function addPosts(posts) {

  const formatPage = document.querySelector(".format-page");
  const container = document.querySelector(".container");
  container.innerHTML = "";
  formatPage.innerHTML = "";
  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.href = post.link;
    postDiv.onclick = () => {
      
      if(post.coverImage.includes("modbay.org")){
        const htmlName = post.link.split("/").pop()
        window.open("src/pages/mods/" + links[htmlName] + ".html", "_blank")
        return
      }
      if(post.link == "#") return
      window.open(post.link, "_blank"); 

    }
    postDiv.className = "post";

    const coverDiv = document.createElement("div");
    coverDiv.className = "cover";
    coverDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgb(58, 58, 58)), url(${post.coverImage})`;

    const titleElement = document.createElement("h2");
    titleElement.className = "title";
    titleElement.textContent = post.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.className = "description";
    descriptionElement.textContent = post.description;

    const linkElement = document.createElement("a");
    linkElement.appendChild(titleElement);

    postDiv.appendChild(coverDiv);
    postDiv.appendChild(linkElement);
    postDiv.appendChild(descriptionElement);
    container.appendChild(postDiv);
  });
}


function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

function displayContent() {
    const params = getQueryParams();
    const contentDiv = document.querySelector('body')

    if (params.mod === 'mod1') {
        contentDiv.innerHTML = '<h1>Content for mod1</h1><p>This is specific content for mod1.</p>';
    } else if (params.mod === 'mod2') {
        contentDiv.innerHTML = '<h1>Content for mod2</h1><p>This is specific content for mod2.</p>';
    } else {
        contentDiv.innerHTML = '<h1>Default Content</h1><p>This is the default content.</p>';
    }
}

// Run the displayContent function when the page loads
//window.onload = displayContent;