'use strict';
// stałe do znajdowania elementów 
const optArticleSelector = '.post', // artykuł
  optTitleSelector = '.post-title', // tytuł artykułu
  optTitleListSelector = '.titles', // lista tytułów
  optArticleTagsSelector = '.post-tags .list', // lista tagów artykułu
  optArticleCategorySelector = 'p.post-category'; // lista tagów artykułu

//FUNKCJA PO KLIKNIĘCIU W TYTUŁ ARTYKUŁU - wyświetlenie właściwego artykułu
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('kliknięty element tytuł : ',clickedElement);
  const art0 = document.getElementById('article-0');
  art0.classList.remove('active');

  /* usunięcie klasy 'active' z wszystkich linków  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for(let activeLink of activeLinks){
    //console.log(activeLink);
    activeLink.classList.remove('active');
  }

  /* dodanie klasy 'active' do klikniętego linku */
  clickedElement.classList.add('active');

  /* usunięcie klasy 'active' ze wszystkjich artykułów */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* pobranie atrybutu 'href' z klikniętego linku */
  const activeSelector = clickedElement.getAttribute('href');
  // console.log(activeSelector);

  /* znajdź właściwy artykuł za pomocą selektora (wartość atrybutu 'href') */
  const targetArticle = document.querySelector(activeSelector);
  //console.log(targetArticle);

  /* dodaj klasę 'active' do właściwego artykułu */
  targetArticle.classList.add('active');
}

// FUNKCJA GENEROWANIE LINKÓW DLA TYTUŁÓW ARTYKUŁÓW - domyślnie wszystkich, po podaniu argumentu generowanie linków z danym tagiem
function generateTitleLinks(customSelector = ''){
  /* czyszczenie miejsca, gdzie będą wyświetlone linki z tytułami */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* znajdź wszystkie artykuły i zapisz do zmiennej */
  const articles = document.querySelectorAll(optArticleSelector + customSelector); // lista artykułów
  let html = '';

  /* dla każdego artykułu */
  for(let article of articles){
    /* pobierz id artykułu */
    const articleId = article.getAttribute('id');

    /* znajdź element html z tytułem */
    /* pobierz tetkst (tytuł artykułu) z elementu */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* stwórz kod html dla linku */
    const linkHTML = '<li><a class="links" href="#' + articleId + '"><span>' + articleTitle + '</span></a><hr></li>'; // tytuły artykułów jako linki, elementy listy

    /* wstaw link do zmiennej - dodajemy każdy link w pętli */
    html = html + linkHTML;
  }
  
  // wstaw kod html w miejsce listy tytułów
  titleList.innerHTML = html;

  //dla wszystkich linków z tytułami
  const links = document.querySelectorAll('.titles a');
  //console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler); // dodajemy nasłuchiwanie kliknięcia, po kliknięciu wywoła się funkcja 
  }
}
generateTitleLinks();

// FUNKCJA WYPISUJĄCA TAGI POD ARTYKUŁEM
function generateTags(){
  /* znajdź wszystkie artykuły */
  const articles = document.querySelectorAll(optArticleSelector);

  /* POCZĄTEK PĘTLI: dla każdego artykułu: */
  for (let article of articles) {
    /* znajdź miejsce wypisania tagów pod artykułem */
    const tagsWraper = article.querySelector(optArticleTagsSelector); // znajdujemy wraper tagów nie w dokumencie, tylko w kazdym artykule!

    /* zmienna html z pustym stringiem */
    let html = '';

    /* pobierz wszytskie tagi artykułu z atrybutu "data-tags" */
    const articleTags = article.getAttribute('data-tags'); //pobieramy do zmiennej wszystkie tagi z artykułu
    //console.log(articleTags);
    /* zmieniamy tekst na obekty w tablicy */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* POCZĄTEK PĘTLI: dla każdego tagu */
    for (let tag of articleTagsArray) {
      //console.log('tag: ',tag);
      /* tworzymy html z linkiem dla każdego tagu*/
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* dodajemy linki do zmiennej */
      html = html + linkHTML;
      //console.log('pętla ' + html);
      tagsWraper.innerHTML = html;
      /*KONIEC PĘTLI: dla każdego tagu */
    }

    /* Wstawiamy kod html z linkami do wrapera tagów */
   
    //console.log('tags wraper: ',tagsWraper);
    //console.log(html);
    /* KONIEC PĘTLI: dla każdego artykułu: */
  }
  
}
generateTags();

// FUNKCJA PO KLIKNIĘCIU W TAG - 
function tagClickHandler(event){
  /* zapobiegaj domyślnej akcji po kliknięciu */
  event.preventDefault();

  /* stała dla elementu "this" - kliknięty element*/
  const clickedElement = this;
 // console.log('kliknięty element: ',clickedElement);  
  /* stała "href" przechowująca atrybut "href" klikniętego elementu */
  const href = clickedElement.getAttribute('href');
  //console.log('kliknięty tag href: '+href);

  /* stała "tag" - wyjmujemy tag ze stałej "href" */
  // sposób mój : const tag = href.slice(4);
  const tag = href.replace('#tag-', '');
  //console.log(tag);

  /* znajdź wszystkie linki tagów z klasą active */
  const activeTagLinks = document.querySelectorAll('.post-tags a.active');
  //console.log(activeTagLinks);

  /* POCZĄTEK PĘTLI: dla każdego aktywnego linku tagu */
  for (let activeTagLink of activeTagLinks){
    /* usuń klasę active */
    activeTagLink.classList.remove('active');
    /* KONIEC PĘTLI: dla każdego aktywnego liku tagu */
  }
  /* znajdź wszystkie linki tagów z atrybutem href równym stałej href */
  const linkiTagow = document.querySelectorAll('[href="' + href + '"]');

  /* POCZĄTEK PĘTLI: dla każdego znalezionego linku tagu */
  for (let linkTagu of linkiTagow){
    /* add class active */
    linkTagu.classList.add('active');
    /* KONIEC PĘTLI: dla każdego znalezionego linku tagu */

  }
  /* wywołanie funkcji GENEROWANIA LISTY TYTUŁÓW z selektorem artykułu jako argument 
            - jeśli wywołamy funkcję bez argumentu, domyślny argument to pusty string, wygenerują się wszystkie tytuły*/
  generateTitleLinks('[data-tags~="' + tag + '"');
}

function addClickListenersToTags(){
  /* znajdź wszystkie linki tagów */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  //console.log(tagLinks);
  /* POCZĄTEK PĘTLI: dla każdego linku */
  for (let tagLink of tagLinks){
    /* dodaj NASŁUCHIWANIE dla linku */
    tagLink.addEventListener('click', tagClickHandler);
  /* KONIEC PĘTLI: dla każdego linku */
  }
}
addClickListenersToTags();





function generateCategories(){
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const categoryWraper = article.querySelector(optArticleCategorySelector);
    let html = '';
    const articleCategory = article.getAttribute('data-category');
    //działaconsole.log(articleCategory);
    let linkHTML = 'Kategoria: <a href="#category-'+ articleCategory +'">' + articleCategory + '</a>';
    //działaconsole.log(linkHTML);
    html = html + linkHTML;
    categoryWraper.innerHTML = html;
  }
}
generateCategories();

function categoryClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //działaconsole.log(clickedElement);
  const href = clickedElement.getAttribute('href');
  const category = href.replace('#category-', '');
  const activeCAtegoryLinks = document.querySelectorAll('.post-category a.active');
  for (let activeCategoryLink of activeCAtegoryLinks){
    /* usuń klasę active */
    activeCategoryLink.classList.remove('active');
    /* KONIEC PĘTLI: dla każdego aktywnego liku tagu */
  }
  const linkiKategorii = document.querySelectorAll('[href="' + href + '"]');
  for (let linkKategorii of linkiKategorii){
    /* add class active */
    linkKategorii.classList.add('active');
    /* KONIEC PĘTLI: dla każdego znalezionego linku tagu */

  }
  generateTitleLinks('[data-category="' + category + '"');
}

function addClickListenerToCategories(){
  const categoryLinks = document.querySelectorAll('a[href^="#category-"]');
  //console.log(categoryLinks);
  for (let catrgoryLink of categoryLinks){
    //działaconsole.log(catrgoryLink);
    /* dodaj NASŁUCHIWANIE dla linku */
    catrgoryLink.addEventListener('click', categoryClickHandler);
  /* KONIEC PĘTLI: dla każdego linku */
  }
}
addClickListenerToCategories();