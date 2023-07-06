function getPageno() {
    const params = new URLSearchParams(location.search);
    const pageno = parseInt(params.get('pageno'));
    return (isNaN(pageno) || pageno <1)? 1: pageno;
};

async function fetch(pageno=1, pagesize=10) {
    const url = `http://sample.bmaster.kro.kr/contacts?pageno=${pageno}&pagesize=${pagesize}`;
    try {
        return await $.ajax(url);
    } catch (error) {
        console.log(error);
        return null; 
    };
};

function printContact({contacts}){
    const $tbody = $('#tbody');
    for(const c of contacts) {
        const html = `
        <tr>
            <td>${c.no}</td>
            <td><a href ="read.html?no=${c.no}">${c.name}</a></td>
            <td>${c.tel}</td>
            <td>${c.address}</td>
        <tr>
        `;
        $tbody.append(html);
    }
};

function getPagination({totalcount, pagesize, pageno, blocksize = 5}){
    const countOfpage = Math.ceil(totalcount/pagesize);
    const prev = Math.floor((pageno-1)/blocksize) * blocksize;
    const start = prev +1;
    let end = prev + blocksize ;
    let next = end +1;
    if(end >=countOfpage) {
        end = countOfpage;
        next = 0;
    };
    return {prev, start, end, next, pageno};
};

function printPagination({prev, start, end, next, pageno}){
    const $pagination = $('#pagination');
    if(prev >0){
        const html =`
        <li class="page-item">
        <a class="page-link" href="list.html?pageno=${prev}">Previous</a>
        </li>
        `;
        $pagination.append(html);
    };

    for(let i =start; i<=end ; i++){
        let li_class = i ===pageno? 'page-item active' : 'page-item';
        const html =`
        <li class="${li_class}">
        <a class="page-link" href="list.html?pageno=${i}">${i}</a>
        </li>
        `
        $pagination.append(html);
    };

    if(next>0) {
        const html =`
        <li class="page-item">
        <a class="page-link" href="list.html?pageno=${next}">Next</a>
        </li>
        `;
        $pagination.append(html);
    };
};