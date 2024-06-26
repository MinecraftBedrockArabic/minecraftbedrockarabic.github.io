document.addEventListener("DOMContentLoaded", function () {
  formatContent();
});
const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/g;
function formatContent() {
  const formatPage = document.querySelector(".format-page");
  if (!formatPage) return;
  formatPage.innerHTML = cleanHTML(formatPage.innerHTML)
    .replace(
      /<p[^>]*>\[media=(https:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9_-]+))\]<\/p>/g,
      '<br><div class="center-content"><iframe src="https://www.youtube.com/embed/$2?si=N_0NMzQvmXnh-Ojo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><br>'
    )
    .replace(
      /<h2>(?:(?!Updated).)*?<\/h2>/g,
      '<div class="title-bookmark">$&</div><br>'
    )
    .replace(
      /<div class="title-bookmark"><h2>(.*?)<\/h2><\/div>/g,
      '<div class="title-bookmark">$1</div><br>'
    )
    .replace(
      /[^\u0000-\u007F\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\u0900-\u097F\u4E00-\u9FFF\/\\]/g,
      ""
    ).replace(arabicRegex, function(match) {
      return `<span lang="ar">${match}</span>`;
    });

  const images = formatPage.querySelectorAll("img");
  images.forEach((img) => {
    img.style.maxWidth = "100%"; // Ensure images don't exceed container width
    img.style.height = "auto"; // Maintain aspect ratio
    // Optionally, you can set a max-height or specific height here if needed
  });

  const listItems = formatPage.querySelectorAll("li");
  listItems.forEach((li) => {
    li.style.wordWrap = "break-word"; // Wrap long words
    li.style.overflowWrap = "break-word"; // Wrap on word breaks
    li.style.whiteSpace = "pre-wrap"; // Preserve white space
  });

  // Darken bright text background colors
  const spansWithBackgroundColor = formatPage.querySelectorAll('span[style*="background-color"]');
  spansWithBackgroundColor.forEach((span) => {
    const textColor = span.style.color;
    span.style.backgroundColor = "transparent";
    span.style.color = brightColor(textColor);
  });

  const spans = formatPage.querySelectorAll('span[style*="color"]');
  spans.forEach((span) => {
    if(!span.parentElement.classList.contains("title-bookmark")) return;
    span.removeAttribute("style");
  })
  // Create spoilers
  const spoilers = formatPage.querySelectorAll(".spoiler");
  spoilers.forEach((spoiler) => {
    const spoilerHead = spoiler.querySelector(".spoiler_head");
    const spoilerBody = spoiler.querySelector(".spoiler_body");
    spoilerBody.style.display = "none"; // Hide spoiler body by default
    spoilerHead.style.cursor = "pointer"; // Change cursor to indicate clickable
    spoilerHead.style["user-select"] = "none";
    spoilerHead.textContent = "▲ " + spoilerHead.textContent;
    spoilerHead.addEventListener("click", () => {
      if (spoilerHead.textContent.includes("▲")) {
        spoilerHead.textContent = spoilerHead.textContent.replace("▲ ", "▼ ");
        spoilerHead.style["background-color"] = "#727272";
      } else {
        spoilerHead.textContent = spoilerHead.textContent.replace("▼ ", "▲ ");
        spoilerHead.style["background-color"] = "#4c4c4c";
      }
      spoilerBody.style.display =
        spoilerBody.style.display === "none" ? "block" : "none";
    });
  });
}

function brightColor(color) {
  return 'rgb(' +
      Math.floor(parseInt(color.slice(4, -1).split(',')[0]) * 1.2) + ',' +
      Math.floor(parseInt(color.slice(4, -1).split(',')[1]) * 1.2) + ',' +
      Math.floor(parseInt(color.slice(4, -1).split(',')[2]) * 1.2) + ')';
}

function cleanHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const attributesToRemove = ["width", "height", "contenteditable", "white-space"];

  function removeAttributes(element) {
    attributesToRemove.forEach((attr) => {
      element.removeAttribute(attr);
    });
  }

  function traverseAndClean(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      removeAttributes(node);
    }
    node.childNodes.forEach((child) => traverseAndClean(child));
  }

  traverseAndClean(doc.body);
  let cleanedHTML = doc.documentElement.outerHTML;
  cleanedHTML = cleanedHTML.replace(/\s*(<[^>]+>)\s*/g, '$1');

  return cleanedHTML;
}