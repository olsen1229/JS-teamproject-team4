const pageNumbersUl = document.getElementById('page-numbers');
const currentPageDiv = document.querySelector('.current-page');

const nums = [...Array(30).keys()].slice(1);

function renderPageNumbers(startIndex) {
    pageNumbersUl.innerHTML = '';
    currentPageDiv.textContent = startIndex;

    if (startIndex > 1) {
        const previousPageLi = document.createElement('li');
        previousPageLi.textContent = 1;
        pageNumbersUl.appendChild(previousPageLi);

        const previousEllipsisLi = document.createElement('li');
        previousEllipsisLi.textContent = '...';
        pageNumbersUl.appendChild(previousEllipsisLi);

        previousEllipsisLi.addEventListener('click', () => {
            const previousStartIndex = Math.max(startIndex - 5, 1);
            renderPageNumbers(previousStartIndex);
        });
    }

    const endIndex = Math.min(startIndex + 4, nums.length);
    for (let i = startIndex; i <= endIndex; i++) {
        const li = document.createElement('li');
        li.textContent = i;

        if (i === startIndex) {
            li.classList.add('active');
        }

        li.addEventListener('click', () => {
            pageNumbersUl.querySelectorAll('.active').forEach(activeLi => activeLi.classList.remove('active'));
            li.classList.add('active');
            currentPageDiv.textContent = i;
        });

        pageNumbersUl.appendChild(li);
    }

    if (endIndex < nums.length) {
        const nextEllipsisLi = document.createElement('li');
        nextEllipsisLi.textContent = '...';
        pageNumbersUl.appendChild(nextEllipsisLi);

        const lastPageLi = document.createElement('li');
        lastPageLi.textContent = nums.length;
        pageNumbersUl.appendChild(lastPageLi);

        nextEllipsisLi.addEventListener('click', () => {
            const nextStartIndex = endIndex + 1;
            renderPageNumbers(nextStartIndex);
        });
    }
}

renderPageNumbers(1);
