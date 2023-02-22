
const hide = (id) => {
  document.getElementById(id).classList.remove('is-active');
}

const show = (id) => {
  document.getElementById(id).classList.add('is-active');
}

const switchTab = (e) => {
  const currentTab = e.target.parentNode;
  const contents = Array.from(currentTab.closest('div.tabs-container').querySelector('div.tabs-content').children);
  const allTabs = Array.from(currentTab.parentNode.children);
  for (const [index, tab] of allTabs.entries()) {
    if (tab !== currentTab) {
      tab.classList.remove('is-active');
      contents[index].classList.remove('is-active');
    } else {
      tab.classList.add('is-active');
      contents[index].classList.add('is-active');
    }
  }
}
