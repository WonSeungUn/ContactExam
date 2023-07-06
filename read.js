function getNo(){
    const param = new URLSearchParams(location.search);
    const no =parseInt(param.get('no'));
    return (isNaN(no) || no<1)? null:no ;
};

async function fetch(no){
    const url = `http://sample.bmaster.kro.kr/contacts/${no}`;
    try {
        return await $.ajax(url);
    } catch (error) {
        console.log(error);
        return null;
    }
};

function printContact(contacts){
    $('#photo').attr('src', contacts.photo);
    $('#name').text(contacts.name);
    $('#tel').text(contacts.tel);
    $('#address').text(contacts.address);
}
