let documentTitle = {
  set(str) {
    const title = str
    var link = document.querySelector("title") || document.createElement('title');
    link.innerHtml = title;
    document.title = title;
  }
};
export default documentTitle;